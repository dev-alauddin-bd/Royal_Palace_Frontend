'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { differenceInDays } from 'date-fns';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  clearCart,
  makeSelectCartItemsByUser,
  removeCartItem,
} from '@/redux/features/cart/cartSlice';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';

import { ShoppingCart, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import PrivateRoute from '@/privateRoute/privateRoute';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);

  // === ==== Select Cart Items for Current User ==== ===
  const selectCartByUser = useMemo(
    () => makeSelectCartItemsByUser(user?._id ?? ''),
    [user?._id],
  );
  const cartItems = useAppSelector(selectCartByUser);

  // === ==== Calculate Nights and Subtotal for Each Cart Item ==== ===
  const cartSummary = cartItems.map((item) => {
    const nights = differenceInDays(
      new Date(item.room.checkOutDate),
      new Date(item.room.checkInDate),
    );
    const subtotal = (item.room.price || 0) * nights;
    return { ...item, nights, subtotal };
  });

  // === ==== Calculate Total Amount ==== ===
  const totalAmount = cartSummary.reduce((sum, item) => sum + item.subtotal, 0);

  // === ==== Handlers ==== ===
  const handleRemove = (roomId: string) => {
    dispatch(removeCartItem(roomId));
    toast.success('Room removed from cart');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen px-4 py-10 bg-background text-foreground">
        <div className="max-w-5xl mx-auto">
          {/* === ==== Title Section ==== === */}
          <div className="flex items-center justify-center pb-10 px-4 text-center flex-wrap">
            <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-20 sm:w-32 mr-4" />
            <div className="flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 title mr-2" />
              <h2 className="title text-base sm:text-lg md:text-xl font-medium tracking-[0.2em] uppercase">
                Boking Carts
              </h2>
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 title ml-2" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-20 sm:w-32 ml-4" />
          </div>

          {/* === ==== Empty Cart UI ==== === */}
          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <ShoppingCart className="mx-auto text-muted-foreground w-12 h-12" />
              <p className="text-lg text-muted-foreground">
                Your cart is empty.
              </p>
              <Link href="/rooms">
                <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                  Explore Rooms
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* === ==== Cart Controls: Clear and Checkout ==== === */}
              <div className="flex justify-between mb-6 border p-2 rounded-md">
                <Button
                  variant="destructive"
                  onClick={handleClearCart}
                  size="sm"
                >
                  Clear Cart
                </Button>
                <Link href="/checkout">
                  <Button
                    className="bg-yellow-500 text-black cursor-pointer hover:bg-yellow-600"
                    size="sm"
                  >
                    Checkout Now
                  </Button>
                </Link>
              </div>

              {/* === ==== Cart Items List ==== === */}
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {cartSummary.map((cart, idx) => (
                  <Card key={idx} className="bg-main border shadow-md">
                    <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                      {/* Image */}
                      <div className="relative w-full sm:w-28 h-28 rounded overflow-hidden">
                        <Image
                          src={cart.room.image}
                          alt="room"
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-1">
                        <h4 className="text-lg font-semibold">
                          {cart.room.name}
                        </h4>
                        <p className="text-sm">
                          {cart.nights} nights × ${cart.room.price} ={' '}
                          <span className="font-semibold text-yellow-400">
                            ${cart.subtotal.toFixed(2)}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Check-in: {cart.room.checkInDate}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Check-out: {cart.room.checkOutDate}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <div className="flex items-center">
                        <Button
                          onClick={() => handleRemove(cart.room.roomId)}
                          variant="ghost"
                          className="text-red-500 hover:bg-red-100"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* === ==== Cart Total Summary ==== === */}
              <div className="mt-8 text-right text-lg font-bold">
                Total:{' '}
                <span className="text-yellow-500">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default CartPage;
