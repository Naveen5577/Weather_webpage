import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-400/30 shadow-lg text-center">
      <AlertTriangle className="w-16 h-16 text-red-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h3>
      <p className="text-white/80 mb-6">{message}</p>
      
      {message.includes('API key') && (
        <div className="bg-white/10 rounded-lg p-4 mb-6 text-left">
          <p className="text-white/90 text-sm mb-2">
            <strong>To use this app, you need a free OpenWeatherMap API key:</strong>
          </p>
          <ol className="text-white/80 text-sm space-y-1 ml-4">
            <li>1. Visit <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">openweathermap.org</a></li>
            <li>2. Sign up for a free account</li>
            <li>3. Get your API key from the dashboard</li>
            <li>4. Replace 'demo_key' in the code with your API key</li>
          </ol>
        </div>
      )}
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white hover:bg-white/30 transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};