'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, User, Mail, Phone } from 'lucide-react';
//===========================booking confirmation booking model =====================================
interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    roomId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    nights: number;
  } | null;
}

// === BookingConfirmationModal: Modal dialog to confirm booking with guest info form and submit action ===
export default function BookingConfirmationModal({
  isOpen,
  onClose,
  bookingDetails,
}: BookingConfirmationModalProps) {
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  //=========================================== Handle booking confirmation API call==========================
  const handleConfirmBooking = async () => {
    if (!bookingDetails) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        'https://royal-place-server.vercel.app/api/bookings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...bookingDetails,
            guestInfo,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        alert('Booking confirmed successfully!');
        onClose();
        window.location.reload();
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!bookingDetails) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-400">
            <CheckCircle className="w-5 h-5" />
            Confirm Your Booking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* =========================================Booking Summary================================== */}
          <div className="p-4 bg-slate-700/30 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Check-in:</span>
              <span>
                {new Date(bookingDetails.checkIn).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Check-out:</span>
              <span>
                {new Date(bookingDetails.checkOut).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Guests:</span>
              <span>{bookingDetails.guests}</span>
            </div>
            <div className="flex justify-between font-bold text-orange-400">
              <span>Total:</span>
              <span>${bookingDetails.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* ============================================Guest Information Form============================= */}
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label className="text-slate-200 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                value={guestInfo.name}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, name: e.target.value })
                }
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* ==================================Email =====================================*/}
            <div className="space-y-2">
              <Label className="text-slate-200 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                type="email"
                value={guestInfo.email}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, email: e.target.value })
                }
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* =====================================Phone ==========================*/}
            <div className="space-y-2">
              <Label className="text-slate-200 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                type="tel"
                value={guestInfo.phone}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, phone: e.target.value })
                }
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/*==================================== Special Requests ======================================*/}
            <div className="space-y-2">
              <Label className="text-slate-200">
                Special Requests (Optional)
              </Label>
              <textarea
                value={guestInfo.specialRequests}
                onChange={(e) =>
                  setGuestInfo({
                    ...guestInfo,
                    specialRequests: e.target.value,
                  })
                }
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500/20"
                placeholder="Any special requests or preferences..."
                rows={3}
              />
            </div>
          </div>

          {/*============================ Action Buttons ======================*/}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-slate-700/30 border-slate-600 text-white hover:bg-slate-700/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBooking}
              disabled={
                isSubmitting ||
                !guestInfo.name ||
                !guestInfo.email ||
                !guestInfo.phone
              }
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
