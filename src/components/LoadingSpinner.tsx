import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading weather data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
      <p className="text-white/80 text-lg font-medium">{message}</p>
      <p className="text-white/60 text-sm mt-2">This may take a few moments</p>
    </div>
  );
};