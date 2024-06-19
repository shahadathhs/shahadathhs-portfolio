'use client'

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;        
  reset: () => void;  
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className='p-10 text-4xl font-bold text-blue-500'>Something went wrong!</h2>
      <button className="btn btn-outline text-blue-500"
        onClick={reset}
      >
        Try again
      </button>
      <div className="divider">OR</div>
      <Link href="/" className="btn btn-outline text-blue-500">
        Return to Home
      </Link>
    </div>
  );
}