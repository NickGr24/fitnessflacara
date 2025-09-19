'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-3xl font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-6">
          We're sorry, but something unexpected happened. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="bg-gradient-to-r from-[#00b4ff] to-[#ffd700] text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Try again
        </button>
      </div>
    </div>
  );
}