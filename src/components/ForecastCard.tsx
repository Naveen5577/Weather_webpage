import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  pop: number;
}

interface ForecastCardProps {
  forecast: ForecastItem;
  isToday?: boolean;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, isToday = false }) => {
  const date = new Date(forecast.dt * 1000);
  const dayName = isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
  const fullDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105">
      <div className="text-center mb-3">
        <h3 className="text-white font-semibold text-lg">{dayName}</h3>
        <p className="text-white/70 text-sm">{fullDate}</p>
      </div>

      <div className="flex justify-center mb-4">
        <WeatherIcon weatherCode={forecast.weather[0].icon} size="lg" />
      </div>

      <div className="text-center mb-4">
        <p className="text-white/90 text-sm capitalize mb-2">{forecast.weather[0].description}</p>
        <div className="text-2xl font-semibold text-white">
          {Math.round(forecast.main.temp)}°
        </div>
        <div className="text-white/70 text-sm">
          {Math.round(forecast.main.temp_max)}° / {Math.round(forecast.main.temp_min)}°
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-300" />
            <span className="text-white/80 text-sm">Rain</span>
          </div>
          <span className="text-white text-sm font-medium">{Math.round(forecast.pop * 100)}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-gray-300" />
            <span className="text-white/80 text-sm">Wind</span>
          </div>
          <span className="text-white text-sm font-medium">
            {Math.round(forecast.wind.speed * 3.6)} km/h
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-cyan-300" />
            <span className="text-white/80 text-sm">Humidity</span>
          </div>
          <span className="text-white text-sm font-medium">{forecast.main.humidity}%</span>
        </div>
      </div>
    </div>
  );
};