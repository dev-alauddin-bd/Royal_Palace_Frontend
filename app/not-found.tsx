// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
      <h1 className="text-8xl font-extrabold text-yellow-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">
        Page Not Found - Royal Place
      </h2>
      <p className="max-w-md text-gray-700 mb-8">
        Sorry, we couldn't find the page you are looking for.
      </p>
      <Link href="/">
        <span className="px-6 py-3 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 transition">
          Go Back Home
        </span>
      </Link>
    </div>
  );
}
