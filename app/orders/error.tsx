'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="mt-4 text-lg">Website Bermasalah: {error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Coba Lagi
      </button>
      <button
        onClick={() => router.push('/')}
        className="mt-2 px-4 py-2 bg-gray-600 text-white rounded"
      >
        Kembali Ke Halaman Utama
      </button>
    </div>
  );
};

export default ErrorPage;
