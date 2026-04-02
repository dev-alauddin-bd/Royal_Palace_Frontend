'use client';

import Image from 'next/image';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
      <h1 className="text-8xl font-extrabold text-yellow-500 mb-4">403</h1>
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">
        Access Denied – Royal Palace
      </h2>
      <p className="max-w-md text-gray-700 mb-8">
        You don’t have the necessary permissions to view this page. Please
        contact the administrator if you believe this is an error.
      </p>
    </div>
  );
}
