import { Bed, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import RoomImageGallery from '@/components/sections/roomDetailsPage/room-details-top-section';
import DateRangeCalendar from '@/components/sections/roomDetailsPage/date-range-calendar-section';
import RoomReviewsSection from '@/components/sections/roomDetailsPage/room-reviews-section';
import PrivateRoute from '@/privateRoute/privateRoute';

// Server-side component
export default async function RoomDetailsPage({params}: {params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ===== Server-side fetch room data =====
  let room = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rooms/${id}`,
      { cache: 'no-store' }, // fetch fresh data on each request
    );
    room = await response.json();
  } catch (error) {
    console.error("Fetch room error:", error);
  }

  if (!room || !room.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <h2 className="text-3xl font-serif text-royal-gold uppercase tracking-widest">Room Not Found</h2>
        <p className="text-foreground/60 uppercase tracking-widest text-[10px] font-bold">The suite you are looking for does not exist or is currently unavailable.</p>
        <Link href="/rooms">
           <button className="royal-button">Back to Rooms</button>
        </Link>
      </div>
    );
  }

  // ===== Return JSX =====
  return (
    <PrivateRoute>
      <div className="min-h-screen text-white overflow-x-hidden">
        {/* ===== Title Section ===== */}
        <div className="flex items-center justify-center py-10 px-4 text-center flex-wrap">
          <div className="h-px bg-royal-gold/20 w-20 sm:w-32 mr-6" />
          <div className="flex items-center justify-center">
            <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-royal-gold mr-4" />
            <h2 className="royal-label">
              Hotel Room Details
            </h2>
            <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-royal-gold ml-4" />
          </div>
          <div className="h-px bg-royal-gold/20 w-20 sm:w-32 ml-6" />
        </div>

        {/* ===== Main Content ===== */}
        <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
          {/* ===== Room Image Gallery ===== */}
          {room?.data?.images?.length ? (
            <RoomImageGallery room={room.data} />
          ) : (
            <div className="w-full h-64 bg-royal-obsidian/5 border border-royal-gold/10 flex items-center justify-center text-foreground/30 uppercase tracking-[0.2em] text-[10px] font-bold">
              No gallery images available
            </div>
          )}

          {/* ===== Room Info and Features ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Room Description */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
                The <span className="text-royal-gold italic">Experience</span>
              </h2>
              <div className="h-px bg-royal-gold/20 w-24" />
              <p className="text-foreground/70 leading-relaxed text-lg font-serif italic">
                "{room?.data?.description ||
                  'Every Signature Room is luxurious, with panoramic views, stunning original architecture and 24-hour personal concierge service.'}"
              </p>
              <p className="text-foreground/60 leading-relaxed text-base">
                Each room is individually designed with a private marble bathroom,
                luxury amenities, flat-screen TV, free Wi-Fi, and more. Our commitment to excellence ensures your stay is nothing short of sovereign.
              </p>
            </div>

            {/* Room Features List */}
            <div className="bg-royal-obsidian/5 p-10 border border-royal-gold/10">
              <h3 className="royal-label mb-8">
                Room Amenities & Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                {room?.data?.features?.length ? (
                  room.data.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <div className="w-1 h-1 bg-royal-gold group-hover:scale-150 transition-transform" />
                      <span className="text-foreground/80 text-xs font-bold uppercase tracking-widest">{feature}</span>
                    </div>
                  ))
                ) : (
                  ['High-Speed Wi-Fi', 'Individual Climate Control', '24-Hour Room Service', 'Premium Minibar', 'Luxury Toiletries', 'Nespresso Coffee Machine'].map(
                    (f, i) => (
                      <div key={i} className="flex items-center space-x-4 group">
                        <div className="w-1 h-1 bg-royal-gold group-hover:scale-150 transition-transform" />
                        <span className="text-foreground/80 text-xs font-bold uppercase tracking-widest">{f}</span>
                      </div>
                    ),
                  )
                )}
              </div>
            </div>
          </div>

          {/* ===== Booking Calendar Section ===== */}
          <div className="pt-12 border-t border-royal-gold/10">
            <DateRangeCalendar room={room.data} />
          </div>

          {/* ===== Royal Service Highlight ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-y border-royal-gold/10">
             <div className="text-center space-y-4">
                <div className="flex justify-center"><Crown className="w-8 h-8 text-royal-gold/50" /></div>
                <h4 className="royal-label !text-[10px]">Personal Concierge</h4>
                <p className="text-foreground/40 text-[10px] uppercase tracking-widest leading-loose">Dedicated assistance for your every need, available 24/7.</p>
             </div>
             <div className="text-center space-y-4">
                <div className="flex justify-center"><Bed className="w-8 h-8 text-royal-gold/50" /></div>
                <h4 className="royal-label !text-[10px]">Premium Linen</h4>
                <p className="text-foreground/40 text-[10px] uppercase tracking-widest leading-loose">Indulge in 1000-thread-count Egyptian cotton for ultimate comfort.</p>
             </div>
             <div className="text-center space-y-4">
                <div className="flex justify-center"><Sparkles className="w-8 h-8 text-royal-gold/50" /></div>
                <h4 className="royal-label !text-[10px]">Turndown Service</h4>
                <p className="text-foreground/40 text-[10px] uppercase tracking-widest leading-loose">Exceptional evening preparation to ensure a perfect night's rest.</p>
             </div>
          </div>

          {/* ===== Room Reviews Section ===== */}
          <div className="pt-12">
            <RoomReviewsSection roomId={id as string} />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
