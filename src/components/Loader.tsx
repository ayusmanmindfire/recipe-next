'use client';

//React imports
import React from 'react';

//Static imports
import { LoaderStrings } from '@/utils/constantStrings';

//A simple loading page with circular progress with animation
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-gray-500">{LoaderStrings.loading}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;