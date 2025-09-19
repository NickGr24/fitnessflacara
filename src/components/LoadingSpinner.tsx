'use client';

export default function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div 
        className="animate-spin rounded-full border-4 border-gray-600 border-t-blue-500"
        style={{ width: size, height: size }}
      />
    </div>
  );
}