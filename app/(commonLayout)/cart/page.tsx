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

import { ShoppingCart, Trash2, Calendar, Bed, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import PrivateRoute from '@/privateRoute/privateRoute';
import { motion } from 'framer-motion';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);

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
    const subtotal = (item.room.price || 0) * nights;
    return { ...item, nights, subtotal };
  });

  const totalAmount = cartSummary.reduce((sum, item) => sum + item.subtotal, 0);

  const handleRemove = (roomId: string) => {
    dispatch(removeCartItem(roomId));
    toast.success('Room removed from your selection');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Your selection has been cleared');
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen pt-32 pb-20 bg-background text-foreground relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-royal-gold/5 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-4">
          {/* ===== Section Header ===== */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-royal-gold/30 w-12 md:w-24 mr-4" />
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-royal-gold" />
                <h2 className="royal-label !text-sm">Your Selection</h2>
              </div>
              <div className="h-px bg-royal-gold/30 w-12 md:w-24 ml-4" />
            </div>
            <h1 className="text-4xl md:text-6xl font-[var(--font-cinzel)] font-bold mb-4">
              Booking <span className="text-royal-gold italic">Summary</span>
            </h1>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto text-center py-20 glass-panel p-10 border-royal-gold/20"
            >
              <div className="w-20 h-20 bg-royal-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="text-royal-gold w-10 h-10" />
              </div>
              <h3 className="text-2xl font-[var(--font-cinzel)] font-bold mb-2">Empty Sanctuary</h3>
              <p className="text-muted-foreground mb-8">
                Your luxury journey hasn't started yet. Browse our exquisite rooms to begin.
              </p>
              <Link href="/rooms" className="inline-block w-full">
                <button className="royal-button w-full">Explore Suites</button>
              </Link>
            </motion.div>
          ) : (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Side: Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center mb-4">
                   <p className="text-sm tracking-widest uppercase font-medium text-muted-foreground">
                     {cartItems.length} {cartItems.length === 1 ? 'Room' : 'Rooms'} Reserved
                   </p>
                   <button 
                    onClick={handleClearCart}
                    className="text-[10px] tracking-[0.2em] uppercase font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                   >
                     <Trash2 className="w-3 h-3" /> Clear All
                   </button>
                </div>

                <div className="space-y-6">
                  {cartSummary.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="bg-main border-royal-gold/10 hover:border-royal-gold/30 transition-all duration-500 overflow-hidden group">
                        <CardContent className="p-0 flex flex-col md:flex-row h-full md:h-44">
                          {/* Image Area */}
                          <div className="relative w-full md:w-56 h-44 md:h-full overflow-hidden">
                            <Image
                              src={item.room.image || ''}
                              alt={item.room.name || 'Room'}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                          </div>

                          {/* Details Area */}
                          <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h4 className="text-xl font-[var(--font-cinzel)] font-bold text-foreground">
                                  {item.room.name}
                                </h4>
                                <button 
                                  onClick={() => handleRemove(item.room.roomId)}
                                  className="text-muted-foreground hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-4 mt-3">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3 text-royal-gold" />
                                  <span>{item.room.checkInDate} — {item.room.checkOutDate}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Bed className="w-3 h-3 text-royal-gold" />
                                  <span>{item.nights} {item.nights === 1 ? 'Night' : 'Nights'}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-end mt-4">
                              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                ${item.room.price} <span className="lowercase">/ night</span>
                              </p>
                              <p className="text-xl font-[var(--font-cinzel)] text-royal-gold font-bold">
                                ${item.subtotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side: Order Summary Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-32">
                  <div className="glass-panel p-8 border-royal-gold/20 relative">
                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-royal-gold/40" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-royal-gold/40" />

                    <h3 className="text-xl font-[var(--font-cinzel)] font-bold mb-6 border-b border-royal-gold/10 pb-4">
                      Total Payable
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Room Subtotal</span>
                        <span className="font-medium">${totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Service Charge</span>
                        <span className="text-green-500 font-medium">Complimentary</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Taxes & Fees</span>
                        <span className="font-medium">Included</span>
                      </div>
                      <div className="h-px bg-royal-gold/10 my-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-[var(--font-cinzel)] font-bold">Total</span>
                        <span className="text-2xl font-[var(--font-cinzel)] font-bold text-royal-gold">
                          ${totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Link href="/checkout">
                      <button className="royal-button w-full group !h-14">
                        PROCEED TO CHECKOUT
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                    
                    <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-[0.1em]">
                      Secure Royal Encryption Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default CartPage;
