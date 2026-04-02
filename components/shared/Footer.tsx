import { Crown } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="relative mt-16 bg-main">
      <div className="px-4 pt-12 container mx-auto">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <Link
              href="/"
              aria-label="Go home"
              title="Royal Palace"
              className="inline-flex items-center"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Crown className="h-5 w-5 text-[#bf9310]" />
                <span className="text-lg font-bold text-[#bf9310]">
                  ROYAL PALACE
                </span>
              </div>
            </Link>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-deep-purple-50">
                Nestled in the heart of the city, our Royal Palace Hotel offers
                timeless elegance and unmatched hospitality.
              </p>
              <p className="mt-4 text-sm text-deep-purple-50">
                Enjoy luxury amenities, exquisite dining, and world-class
                service designed to make your stay unforgettable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-semibold tracking-wide text-[#bf9310]">
                Quick Links
              </p>
              <ul className="mt-2 space-y-2">
                {[
                  'About Us',
                  'Rooms & Suites',
                  'Gallery',
                  'Special Offers',
                ].map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-[#bf9310]"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-[#bf9310]">
                Guest Services
              </p>
              <ul className="mt-2 space-y-2">
                {[
                  'Spa & Wellness',
                  'Fine Dining',
                  'Event Planning',
                  'Concierge',
                ].map((service) => (
                  <li key={service}>
                    <Link
                      href="/"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-[#bf9310]"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-[#bf9310]">
                Experiences
              </p>
              <ul className="mt-2 space-y-2">
                {[
                  'Water Sports',
                  'Island Tours',
                  'Cultural Events',
                  'Private Dinners',
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-[#bf9310]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-[#bf9310]">
                Contact
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-[#bf9310]"
                  >
                    +1 (555) 123-4567
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-[#bf9310]"
                  >
                    info@royalpalace.com
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-[#bf9310]"
                  >
                    123 Luxury Lane, Maldives
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="transition-colors duration-300 text-deep-purple-50 hover:text-[#bf9310]"
                  >
                    Open 24/7
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
          <p className="text-sm text-gray-100">
            &copy; 2025 Royal Palace Hotel. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            {/* Social Icons (you can replace with lucide-react if needed) */}
            {/* Just keeping the structure — already done earlier */}
          </div>
        </div>
      </div>
    </div>
  );
}
