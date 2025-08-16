import React from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Eye,
  Moon,
  CloudyIcon as Cloudy
} from 'lucide-react';

interface WeatherIconProps {
  weatherCode: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherCode, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const getIcon = () => {
    const code = weatherCode.toLowerCase();
    const baseClass = `${sizeClasses[size]} ${className}`;

    // Clear sky
    if (code === '01d') return <Sun className={`${baseClass} text-yellow-400`} />;
    if (code === '01n') return <Moon className={`${baseClass} text-blue-200`} />;

    // Few clouds
    if (code === '02d' || code === '02n') return <Cloudy className={`${baseClass} text-gray-300`} />;

    // Scattered clouds
    if (code === '03d' || code === '03n' || code === '04d' || code === '04n') {
      return <Cloud className={`${baseClass} text-gray-400`} />;
    }

    // Shower rain
    if (code === '09d' || code === '09n') return <CloudDrizzle className={`${baseClass} text-blue-400`} />;

    // Rain
    if (code === '10d' || code === '10n') return <CloudRain className={`${baseClass} text-blue-500`} />;

    // Thunderstorm
    if (code === '11d' || code === '11n') return <CloudLightning className={`${baseClass} text-purple-400`} />;

    // Snow
    if (code === '13d' || code === '13n') return <CloudSnow className={`${baseClass} text-blue-100`} />;

    // Mist/Fog
    if (code === '50d' || code === '50n') return <Eye className={`${baseClass} text-gray-300`} />;

    // Default
    return <Sun className={`${baseClass} text-yellow-400`} />;
  };

  return getIcon();
};