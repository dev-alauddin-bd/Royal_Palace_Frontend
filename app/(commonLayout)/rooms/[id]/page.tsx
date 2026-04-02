import { Bed } from 'lucide-react';
import RoomImageGallery from '@/components/sections/roomDetailsPage/room-details-top-section';
import DateRangeCalendar from '@/components/sections/roomDetailsPage/date-range-calendar-section';
import RoomReviewsSection from '@/components/sections/roomDetailsPage/room-reviews-section';
import PrivateRoute from '@/privateRoute/privateRoute';

// Server-side component
export default async function RoomDetailsPage({params}: {params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ===== Server-side fetch room data =====
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/rooms/${id}`,
    { cache: 'no-store' }, // fetch fresh data on each request
  );
  const room = await response.json(); // expected format: { data: { ...roomData } }

  // ===== Return JSX =====
  return (
    <PrivateRoute>
      <div className="min-h-screen text-white overflow-x-hidden">
        {/* ===== Title Section ===== */}
        <div className="flex items-center justify-center py-6 sm:py-10 px-4 text-center flex-wrap">
          <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-20 sm:w-32 mr-4" />
          <div className="flex items-center justify-center">
            <Bed className="w-5 h-5 sm:w-6 sm:h-6 title mr-2" />
            <h2 className="title text-base sm:text-lg md:text-xl font-medium tracking-[0.2em] uppercase">
              Hotel Room Details
            </h2>
            <Bed className="w-5 h-5 sm:w-6 sm:h-6 title ml-2" />
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-20 sm:w-32 ml-4" />
        </div>

        {/* ===== Main Content ===== */}
        <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
          {/* ===== Room Image Gallery ===== */}
          {room?.data.images?.length ? (
            <RoomImageGallery room={room.data} />
          ) : (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md text-gray-500">
              No images available
            </div>
          )}

          {/* ===== Room Info and Features ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Room Description */}
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 title">
                About {room?.data?.name || 'The Royal Room'}
              </h2>
              <p className="text-foreground leading-relaxed mb-4 text-sm sm:text-base md:text-lg">
                {room?.data?.description ||
                  'Every Signature Room is luxurious, with panoramic views, stunning original architecture and 24-hour personal concierge service.'}
              </p>
              <p className="text-foreground leading-relaxed text-sm sm:text-base md:text-lg">
                Each room is individually designed with a private marble bathroom,
                luxury amenities, flat-screen TV, free Wi-Fi, and more.
              </p>
            </div>

            {/* Room Features List */}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 title">
                Room Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room?.data?.features?.length ? (
                  room.data.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#bf9310] rounded-full" />
                      <span className="text-foreground text-sm sm:text-base">{feature}</span>
                    </div>
                  ))
                ) : (
                  ['Free Wi-Fi', 'Air Conditioning', 'Room Service'].map(
                    (f, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#bf9310] rounded-full" />
                        <span className="text-foreground text-sm sm:text-base">{f}</span>
                      </div>
                    ),
                  )
                )}
              </div>
            </div>
          </div>

          {/* ===== Booking Calendar Section ===== */}
          <DateRangeCalendar room={room.data} />

          {/* ===== Room Reviews Section ===== */}
          <RoomReviewsSection roomId={id as string} />
        </div>
      </div>
    </PrivateRoute>
  );
}
