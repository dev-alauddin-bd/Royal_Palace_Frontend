'use client';

import Image from 'next/image';
import { useState } from 'react';
import Loader from '@/components/shared/Loader';

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
    <div className="mb-12">
      {/* ========== 📷 Main Image Display ========== */}
      <div className="relative group overflow-hidden border border-royal-gold/10">
        <Image
          src={mainImage}
          alt={`${room?.name || 'Room'} - Main Image`}
          width={1200}
          height={600}
          className="w-full h-[75vh] object-cover rounded-none transition-transform duration-1000 group-hover:scale-105"
          priority
          unoptimized
          onLoad={() => setLoading(false)}
        />

        {/* ========== 🔄 Loading Spinner ========== */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-royal-obsidian/40 z-10">
            <div className="w-12 h-12 border-2 border-royal-gold border-t-transparent animate-spin" />
          </div>
        )}

        {/* ========== 💰 Price Tag ========== */}
        <div className="absolute top-8 right-8 bg-royal-gold text-royal-blue px-8 py-3 font-serif font-bold text-sm tracking-[0.2em] uppercase shadow-2xl">
          ${room?.price || 0} / NIGHT
        </div>

        {/* Decorative corner */}
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-royal-gold/50" />
      </div>

      {/* ========== 🖼️ Thumbnails Gallery ========== */}
      {room?.images && room.images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 mt-6">
          {room.images.map((img, index) => (
            <div 
              key={index}
              onClick={() => {
                setLoading(true);
                setMainImage(img);
              }}
              className={`relative h-20 cursor-pointer overflow-hidden border transition-all duration-300
                ${
                  mainImage === img
                    ? 'border-royal-gold ring-1 ring-royal-gold'
                    : 'border-white/10 hover:border-royal-gold/50'
                }`}
            >
              <Image
                src={img || '/placeholder.svg'}
                alt={`${room?.name || 'Room'} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
