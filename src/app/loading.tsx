import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size={60} />
        <p className="text-white mt-4 text-lg">Loading...</p>
      </div>
    </div>
  );
}