'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { differenceInDays } from 'date-fns';
import { Bed, Check, Award, ShoppingCart, User, MapPin, Phone, Mail, ArrowLeft, CreditCard } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import PrivateRoute from '@/privateRoute/privateRoute';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';

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

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    if (!name || !email || !phone || !address || !city || !postcode) {
      return toast.error("Please fill all royal fields");
    }

    if (cartItems.length === 0) {
      return toast.error("Your royal selection is empty!");
    }

    setIsSubmitting(true);

    try {
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

      if (!bookingRes?.data?.paymentUrl) {
        throw new Error("Payment initialization failed");
      }

      window.location.href = bookingRes.data.paymentUrl;

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

  return (
    <PrivateRoute>
      <div className="min-h-screen pt-32 pb-20 bg-background text-foreground relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-royal-gold/5 rounded-full blur-[140px] -z-10" />
        
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link href="/cart" className="inline-flex items-center text-xs uppercase tracking-widest text-royal-gold hover:text-royal-gold-light mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Selection
            </Link>
            <h1 className="text-4xl md:text-5xl font-[var(--font-cinzel)] font-bold">
              Finalize Your <span className="text-royal-gold italic">Reservation</span>
            </h1>
          </motion.div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 glass-panel border-royal-gold/20 max-w-lg mx-auto">
              <ShoppingCart className="w-16 h-16 text-royal-gold/30 mx-auto mb-4" />
              <p className="text-xl font-[var(--font-cinzel)] mb-6">Your selection is currently empty</p>
              <Link href="/rooms">
                <button className="royal-button">Explore Suites</button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Form & Selection (8 cols) */}
              <div className="lg:col-span-8 space-y-10">
                
                {/* 1. Guest Information Section */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-royal-gold/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-royal-gold" />
                    </div>
                    <h3 className="text-xl font-[var(--font-cinzel)] font-bold uppercase tracking-wider">Guest Information</h3>
                  </div>
                  
                  <div className="glass-panel p-8 border-royal-gold/20 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      icon={<User className="w-4 h-4" />}
                      label="Full Name" 
                      placeholder="Enter your name"
                      value={name} 
                      onChange={setName} 
                      required 
                    />
                    <InputField 
                      icon={<Mail className="w-4 h-4" />}
                      label="Email Address" 
                      type="email" 
                      placeholder="your@email.com"
                      value={email} 
                      onChange={setEmail} 
                      required 
                    />
                    <InputField 
                      icon={<Phone className="w-4 h-4" />}
                      label="Phone Number" 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={phone} 
                      onChange={setPhone} 
                      required 
                    />
                    <InputField 
                      icon={<MapPin className="w-4 h-4" />}
                      label="Street Address" 
                      placeholder="123 Royal Lane"
                      value={address} 
                      onChange={setAddress} 
                      required 
                    />
                    <InputField 
                      icon={<MapPin className="w-4 h-4" />}
                      label="City / Region" 
                      placeholder="London"
                      value={city} 
                      onChange={setCity} 
                      required 
                    />
                    <InputField 
                      icon={<MapPin className="w-4 h-4" />}
                      label="Postcode / ZIP" 
                      placeholder="NW1 6XE"
                      value={postcode} 
                      onChange={setPostcode} 
                      required 
                    />
                  </div>
                </section>

                {/* 2. Room Review Section */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-royal-gold/20 flex items-center justify-center">
                      <Bed className="w-4 h-4 text-royal-gold" />
                    </div>
                    <h3 className="text-xl font-[var(--font-cinzel)] font-bold uppercase tracking-wider">Review Selection</h3>
                  </div>

                  <div className="space-y-4">
                    {cartSummary.map((item, idx) => (
                      <Card key={idx} className="bg-main/50 border-royal-gold/10 overflow-hidden">
                        <CardContent className="p-4 flex gap-4 items-center">
                          <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0">
                            <Image src={item.room.image || ''} alt={item.room.name || 'Room'} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-[var(--font-cinzel)] font-bold text-lg">{item.room.name}</h4>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                              {item.nights} Nights × ${item.room.price}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.room.checkInDate} to {item.room.checkOutDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-royal-gold font-bold font-[var(--font-cinzel)]">${item.subtotal.toFixed(2)}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column: Summary (4 cols) */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-6">
                  <div className="glass-panel p-8 border-royal-gold/30">
                    <h3 className="text-xl font-[var(--font-cinzel)] font-bold mb-6 border-b border-royal-gold/10 pb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-royal-gold" /> Booking Summary
                    </h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Stay Subtotal</span>
                        <span className="font-medium">${totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Processing Fee</span>
                        <span className="text-green-500 font-medium">Waived</span>
                      </div>
                      <div className="h-px bg-royal-gold/10 my-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-[var(--font-cinzel)] font-bold">Total Payable</span>
                        <span className="text-2xl font-[var(--font-cinzel)] font-bold text-royal-gold">
                          ${totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-royal-gold/5 p-4 border border-royal-gold/20 mb-8 rounded-none">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-gold mb-3 flex items-center gap-2">
                        <Award className="w-3 h-3" /> Royal Privileges Included
                      </h4>
                      <ul className="text-[11px] space-y-2 text-foreground/80">
                        <li className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-royal-gold" /> 24/7 Concierge Service
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-royal-gold" /> High-speed Private Wi-Fi
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-royal-gold" /> Express Check-in Experience
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="royal-button w-full !h-16 group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 italic">
                          <span className="animate-spin w-4 h-4 border-2 border-royal-blue border-t-transparent rounded-full" />
                          Initializing Secure Portal...
                        </span>
                      ) : (
                        "CONFIRM & PAY NOW"
                      )}
                    </button>
                    
                    <div className="mt-6 flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                       {/* Mock Payment Provider Icons */}
                       <div className="text-[8px] uppercase tracking-tighter">Secured by SSLCommerz</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Toaster position="top-right" />
      </div>
    </PrivateRoute>
  );
}

function InputField({
  label,
  value,
  onChange,
  icon,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-gold flex items-center gap-2">
        {icon}
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 bg-white/5 border-royal-gold/10 text-foreground placeholder:text-muted-foreground/30 focus:border-royal-gold/50 transition-all rounded-none ring-0 focus-visible:ring-0"
      />
    </div>
  );
}
