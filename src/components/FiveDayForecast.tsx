import React from 'react';
import { ForecastData } from '../types/weather';
import { ForecastCard } from './ForecastCard';

interface FiveDayForecastProps {
  forecast: ForecastData;
}

export const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ forecast }) => {
  // Group forecast data by day and get one entry per day (around midday)
  const getDailyForecast = () => {
    const dailyData: { [key: string]: any } = {};
    
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();
      
      // Get midday forecast (12:00) or closest available
      if (!dailyData[dateKey] || Math.abs(date.getHours() - 12) < Math.abs(new Date(dailyData[dateKey].dt * 1000).getHours() - 12)) {
        dailyData[dateKey] = item;
      }
    });

    return Object.values(dailyData).slice(0, 5);
  };

  const dailyForecast = getDailyForecast();

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">5-Day Forecast</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecast.map((item, index) => (
          <ForecastCard 
            key={item.dt} 
            forecast={item} 
            isToday={index === 0}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
        <p className="text-white/80 text-sm text-center">
          <span className="font-medium">Location:</span> {forecast.city.name}, {forecast.city.country}
        </p>
        <p className="text-white/70 text-xs text-center mt-1">
          Population: {forecast.city.population.toLocaleString()} • 
          Timezone: GMT{forecast.city.timezone >= 0 ? '+' : ''}{forecast.city.timezone / 3600}
        </p>
      </div>
    </div>
  );
};