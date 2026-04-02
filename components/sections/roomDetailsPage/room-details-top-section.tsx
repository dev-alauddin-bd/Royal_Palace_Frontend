'use client';

import Image from 'next/image';
import { useState } from 'react';

// ========== 🧾 Types ==========
interface Room {
  _id: string;
  name?: string;
  images?: string[];
  price?: number;
  description?: string;
  features?: string[];
}

interface RoomImageGalleryProps {
  room: Room;
}

// ========== 🖼️ RoomImageGallery ==========
export default function RoomImageGallery({ room }: RoomImageGalleryProps) {
  const [mainImage, setMainImage] = useState(
    room?.images?.[0] || '/placeholder.svg',
  );
  const [loading, setLoading] = useState(false);

  return (
    <div className="mb-8">
      {/* ========== 📷 Main Image Display ========== */}
      <div className="relative">
        <Image
          src={mainImage}
          alt={`${room?.name || 'Room'} - Main Image`}
          width={800}
          height={400}
          className="w-full h-[70vh] object-cover rounded-lg"
          priority
          unoptimized
          onLoad={() => setLoading(false)}
        />

        {/* ========== 🔄 Loading Spinner ========== */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg z-10">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* ========== 💰 Price Tag ========== */}
        <div className="absolute top-4 right-4 bg-[#bf9310] text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
          ${room?.price || 0}/night
        </div>
      </div>

      {/* ========== 🖼️ Thumbnails Gallery ========== */}
      {room?.images && room.images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-4">
          {room.images.map((img, index) => (
            <Image
              key={index}
              src={img || '/placeholder.svg'}
              alt={`${room?.name || 'Room'} - Thumbnail ${index + 1}`}
              width={150}
              height={100}
              onClick={() => {
                setLoading(true);
                setMainImage(img);
              }}
              className={`w-full h-20 object-cover rounded cursor-pointer transition-all border-2
                ${
                  mainImage === img
                    ? 'border-[#bf9310]'
                    : 'border-transparent hover:border-[#bf9310]'
                }`}
              unoptimized
            />
          ))}
        </div>
      )}
    </div>
  );
}
