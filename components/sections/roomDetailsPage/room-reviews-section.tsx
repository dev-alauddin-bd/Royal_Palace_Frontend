// ====================================================
// 🧾 RoomReviewsSection Component (FIXED VERSION v3)
// ====================================================

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Star,
  MessageCircle,
  Calendar,
  Quote,
} from 'lucide-react';

import {
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
  useFindTestimonialsByRoomIdQuery,
} from '@/redux/features/testimonial/testimonialApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import toast from 'react-hot-toast';

// ===== 🔹 Type Definitions ===== //
interface Review {
  _id: string;
  userId: string;
  userName: string;
  userImage: string;
  roomId: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
}
interface RoomReviewsSectionProps {
  roomId?: string;
}

const RoomReviewsSection = ({ roomId }: RoomReviewsSectionProps) => {
  // ===== 🔹 Local States ===== //
  const user = useSelector(selectCurrentUser);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });

  // ===== 🔹 RTK Query Hooks ===== //
  const { data, refetch } = useFindTestimonialsByRoomIdQuery(roomId);
  const reviewsData: Review[] = data?.data || [];

  const [deleteTestimonial] = useDeleteTestimonialMutation();
  const [createTestimonial, { isLoading: isSubmitting }] =
    useCreateTestimonialMutation();

  // ========== 🔁 Submit Review Handler ========== //
  const submitReviewHandler = async () => {
    if (!newReview.text || !newReview.rating || !roomId) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const payload = {
        userName: user?.name,
        userId: user?._id,
        userImage: user?.image,
        roomId,
        rating: newReview.rating,
        reviewText: newReview.text,
        reviewDate: new Date().toISOString(),
      };

      await createTestimonial(payload).unwrap();
      toast.success('Thank you for your feedback!');
      setNewReview({ rating: 5, text: '' });
      setShowWriteReview(false);
      refetch();
    } catch (error: any) {
      const message = error?.data?.message || 'Something went wrong.';
      toast.error(message);
    }
  };

  // ========== 🔁 Delete Review Handler ========== //
  const handleDeleteReview = async (id: string) => {
    try {
      await deleteTestimonial(id).unwrap();
      toast.success('Review removed.');
      refetch();
    } catch (error) {
      toast.error('Failed to remove review.');
    }
  };

  return (
    <section className="relative py-20 overflow-x-hidden">
      <div className="container mx-auto px-0">
        {/* ===== 🔹 Section Header ===== */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8 flex-wrap gap-4">
            <div className="h-px bg-royal-gold/20 w-24 sm:w-32" />
            <div className="flex items-center">
              <MessageCircle className="w-5 h-5 text-royal-gold mr-4" />
              <h2 className="royal-label">Guest Experiences</h2>
              <MessageCircle className="w-5 h-5 text-royal-gold ml-4" />
            </div>
            <div className="h-px bg-royal-gold/20 w-24 sm:w-32" />
          </div>
        </div>

        {/* ===== 🔹 Filter & Action Panel ===== */}
        <div className="flex flex-wrap items-center justify-between mb-12 gap-8 border-b border-royal-gold/10 pb-12">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="royal-label !text-[10px]">Filter:</span>
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedRating(null)}
                className={`text-[10px] font-bold uppercase tracking-widest px-6 py-2 transition-all border ${
                  selectedRating === null
                    ? 'bg-royal-gold text-royal-blue border-royal-gold'
                    : 'border-royal-gold/20 text-royal-gold hover:border-royal-gold'
                }`}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((rating) => {
                const isActive = selectedRating === rating;
                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setSelectedRating(rating)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 transition-all border flex items-center gap-2 ${
                      isActive
                        ? 'bg-royal-gold text-royal-blue border-royal-gold'
                        : 'border-royal-gold/20 text-royal-gold hover:border-royal-gold'
                    }`}
                  >
                    {rating} <Star className={`w-3 h-3 ${isActive ? 'fill-royal-blue' : 'fill-royal-gold'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowWriteReview(!showWriteReview)}
            className="royal-button !h-12 !text-[10px] px-10"
          >
            {showWriteReview ? 'CANCEL REVIEW' : 'WRITE REVIEW'}
          </button>
        </div>

        {/* ===== 🔹 Review Form ===== */}
        {showWriteReview && (
          <Card className="bg-royal-obsidian/5 border border-royal-gold/10 rounded-none mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-royal-gold" />
            <CardContent className="p-8 sm:p-12">
              <h3 className="text-3xl font-serif font-bold text-foreground mb-8">
                Share Your <span className="text-royal-gold italic">Experience</span>
              </h3>
              <div className="mb-10">
                <label className="royal-label !text-[10px] mb-4 block">Overall Rating</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          rating <= newReview.rating
                            ? 'text-royal-gold fill-royal-gold'
                            : 'text-foreground/10'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <label className="royal-label !text-[10px] mb-4 block">Your Feedback</label>
                <Textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder="Describe your stay at the Royal Palace..."
                  rows={6}
                  className="bg-white/5 border-royal-gold/10 rounded-none text-foreground placeholder:text-foreground/20 focus-visible:ring-0 focus-visible:border-royal-gold p-6 text-base"
                />
              </div>

              <button
                type="button"
                onClick={submitReviewHandler}
                disabled={isSubmitting}
                className="royal-button-solid !h-14 text-[11px] px-14"
              >
                {isSubmitting ? 'SUBMITTING...' : 'PUBLISH REVIEW'}
              </button>
            </CardContent>
          </Card>
        )}

        {/* ===== 🔹 Review List ===== */}
        <div className="grid grid-cols-1 gap-8">
          {reviewsData
            .filter((review) => (selectedRating ? review.rating === selectedRating : true))
            .map((review) => (
              <Card
                key={review._id}
                className="bg-royal-obsidian/5 border border-royal-gold/10 rounded-none overflow-hidden"
              >
                <CardContent className="p-10 relative">
                  <div className="absolute top-10 right-10 opacity-5">
                    <Quote className="w-20 h-20 text-royal-gold" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-10 relative z-10">
                    <div className="flex-shrink-0">
                      <Image
                        src={review.userImage || '/placeholder.svg'}
                        alt={review.userName}
                        width={80}
                        height={80}
                        className="w-20 h-20 border border-royal-gold/20 object-cover"
                      />
                    </div>

                    <div className="flex-grow space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h4 className="text-xl font-serif font-bold text-foreground">
                            {review.userName}
                          </h4>
                          <div className="flex items-center gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= review.rating
                                    ? 'text-royal-gold fill-royal-gold'
                                    : 'text-foreground/20'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {user?._id === review.userId && (
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(review._id)}
                            className="text-[10px] font-bold uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors border border-red-500/20 px-4 py-2"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <p className="text-foreground/80 leading-relaxed text-lg font-serif italic">
                        "{review.reviewText}"
                      </p>

                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 pt-4">
                        <Calendar className="w-3 h-3 text-royal-gold" />
                        {new Date(review.reviewDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
          {reviewsData.length === 0 && (
            <div className="text-center py-20 border border-royal-gold/10">
               <p className="text-foreground/40 royal-label">No reviews yet for this suite.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomReviewsSection;
