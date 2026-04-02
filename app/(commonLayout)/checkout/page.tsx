'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { differenceInDays } from 'date-fns';
import { Bed, Check, Award, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  clearCart,
  makeSelectCartItemsByUser,
  removeCartItem,
} from '@/redux/features/cart/cartSlice';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useBookingInitiateMutation } from '@/redux/features/booking/bookingApi';
import {

  useCancelPaymentMutation,

} from '@/redux/features/payment/paymentApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import PrivateRoute from '@/privateRoute/privateRoute';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function RoyalCheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const [bookingInitiate] = useBookingInitiateMutation();
  const [cancelPayment] = useCancelPaymentMutation();

  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const selectCartByUser = useMemo(
    () => makeSelectCartItemsByUser(user?._id ?? ''),
    [user?._id],
  );
  const cartItems = useAppSelector(selectCartByUser);

  const cartSummary = cartItems.map((item) => {
    const nights = differenceInDays(
      new Date(item.room.checkOutDate),
      new Date(item.room.checkInDate),
    );
    const price = item?.room?.price ?? 0;
    const subtotal = price * nights;
    return { ...item, nights, subtotal };
  });

  const totalAmount = cartSummary.reduce((sum, item) => sum + item.subtotal, 0);

  const handleRemove = (roomId: string) => dispatch(removeCartItem(roomId));
  const handleClearCart = () => {
    toast((t) => (
      <div className="p-4 space-y-2 text-sm">
        <p>Are you sure you want to clear your booking cart?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              dispatch(clearCart());
              toast.dismiss(t.id);
              toast.success('Cart cleared!');
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-400 text-black rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  // ✅ Submit Booking & Stripe Payment
 const handleSubmit = async () => {
  if (!name || !email || !phone || !address || !city || !postcode) {
    return toast.error("Please fill all fields");
  }

  if (cartItems.length === 0) {
    return toast.error("Cart is empty!");
  }

  setIsSubmitting(true);

  try {
    // ================== 1️⃣ Create Booking ==================
    const bookingData = {
      userId: user?._id,
      rooms: cartItems.map((item) => item.room),
      totalAmount,
      name,
      email,
      phone,
      address,
      city,
      postcode,
    };

    const bookingRes = await bookingInitiate(bookingData).unwrap();

    if (!bookingRes?.paymentUrl) {
      throw new Error("Payment initialization failed");
    }


    // ================== 3️⃣ Redirect to SSLCommerz ==================
    window.location.href = bookingRes.paymentUrl;

  } catch (err: any) {
    console.error("handleSubmit error:", err);

    toast.error(
      err?.data?.message ||
      err?.message ||
      "Something went wrong. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};


  // ✅ Cancel Booking & Payment
  const handleCancelBooking = async () => {
    if (!transactionId) return toast.error('No booking to cancel');
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    setIsCancelling(true);
    try {
      const response = await cancelPayment({
        bookingId: transactionId,
      }).unwrap();
      toast.success(response.message || 'Booking cancelled successfully!');
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to cancel booking');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-background text-foreground py-10 px-4">
        {cartItems.length === 0 ? (
          <div className="container mx-auto flex flex-col items-center text-center space-y-6 py-20">
            <ShoppingCart className="w-16 h-16 text-muted-foreground" />
            <p className="text-xl font-medium text-muted-foreground">
              Your booking cart is empty
            </p>
            <Link href="/rooms">
              <Button
                variant="default"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Explore Rooms
              </Button>
            </Link>
          </div>
        ) : (
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center border p-2 rounded-md">
                <h3 className="text-xl font-semibold">Selected Rooms</h3>
                <Button
                  onClick={handleClearCart}
                  variant="destructive"
                  size="sm"
                >
                  Clear Cart
                </Button>
              </div>

              {cartSummary.map((cart, idx) => (
                <Card
                  key={idx}
                  className="bg-main border border-yellow-500/20 shadow"
                >
                  <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-28 h-28 rounded overflow-hidden">
                      <Image
                        src={cart.room.image}
                        alt="room"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-lg font-bold">{cart.room.name}</h4>
                      <p className="text-sm">
                        ${cart.room.price} x {cart.nights} nights ={' '}
                        <span className="text-yellow-500 font-semibold">
                          ${cart.subtotal.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-xs">
                        Check-in: {cart.room.checkInDate}
                      </p>
                      <p className="text-xs">
                        Check-out: {cart.room.checkOutDate}
                      </p>
                      <Button
                        onClick={() => handleRemove(cart.room.roomId)}
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-300 hover:bg-red-100"
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-main">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Your Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InputField
                    label="Full Name"
                    value={name}
                    onChange={setName}
                    required
                  />
                  <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required
                  />
                  <InputField
                    label="Phone"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    required
                  />
                  <InputField
                    label="Address"
                    value={address}
                    onChange={setAddress}
                    required
                  />
                  <InputField
                    label="City"
                    value={city}
                    onChange={setCity}
                    required
                  />
                  <InputField
                    label="Postcode"
                    value={postcode}
                    onChange={setPostcode}
                    required
                  />
                </CardContent>
              </Card>
            </div>

            <div className="sticky top-24 space-y-6">
              <Card className="bg-main shadow border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" /> Royal Inclusions
                    </h4>
                    <ul className="text-sm space-y-1 text-green-400">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Breakfast Included
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Spa Access
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Free Cancellation
                      </li>
                    </ul>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-yellow-500 text-black font-bold hover:bg-yellow-600"
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Booking & Pay'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        <Toaster position="top-right" />
      </div>
    </PrivateRoute>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label className="text-sm mb-1 block text-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background text-foreground"
      />
    </div>
  );
}
