import React from 'react';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherProps {
  weather: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getFeelsLike = (temp: number) => {
    if (temp > 30) return 'Hot';
    if (temp > 20) return 'Warm';
    if (temp > 10) return 'Cool';
    return 'Cold';
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{weather.name}, {weather.sys.country}</h2>
        <p className="text-white/80 text-lg capitalize">{weather.weather[0].description}</p>
        <p className="text-white/60 text-sm mt-1">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="flex items-center justify-center mb-8">
        <WeatherIcon weatherCode={weather.weather[0].icon} size="xl" />
        <div className="ml-6">
          <div className="text-6xl font-light text-white">
            {Math.round(weather.main.temp)}°
          </div>
          <div className="text-white/70 text-lg">
            Feels like {Math.round(weather.main.feels_like)}°
          </div>
          <div className="text-white/60 text-sm">
            {getFeelsLike(weather.main.feels_like)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Thermometer className="w-6 h-6 text-red-300 mx-auto mb-2" />
          <div className="text-white/90 text-sm font-medium">High/Low</div>
          <div className="text-white text-lg font-semibold">
            {Math.round(weather.main.temp_max)}°/{Math.round(weather.main.temp_min)}°
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Droplets className="w-6 h-6 text-blue-300 mx-auto mb-2" />
          <div className="text-white/90 text-sm font-medium">Humidity</div>
          <div className="text-white text-lg font-semibold">{weather.main.humidity}%</div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Wind className="w-6 h-6 text-gray-300 mx-auto mb-2" />
          <div className="text-white/90 text-sm font-medium">Wind</div>
          <div className="text-white text-lg font-semibold">
            {Math.round(weather.wind.speed * 3.6)} km/h
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Gauge className="w-6 h-6 text-yellow-300 mx-auto mb-2" />
          <div className="text-white/90 text-sm font-medium">Pressure</div>
          <div className="text-white text-lg font-semibold">{weather.main.pressure} hPa</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Eye className="w-5 h-5 text-purple-300 mx-auto mb-2" />
          <div className="text-white/90 text-xs font-medium">Visibility</div>
          <div className="text-white text-sm font-semibold">
            {Math.round(weather.visibility / 1000)} km
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Sunrise className="w-5 h-5 text-orange-300 mx-auto mb-2" />
          <div className="text-white/90 text-xs font-medium">Sunrise</div>
          <div className="text-white text-sm font-semibold">
            {formatTime(weather.sys.sunrise)}
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
          <Sunset className="w-5 h-5 text-pink-300 mx-auto mb-2" />
          <div className="text-white/90 text-xs font-medium">Sunset</div>
          <div className="text-white text-sm font-semibold">
            {formatTime(weather.sys.sunset)}
          </div>
        </div>
      </div>
    </div>
  );
};