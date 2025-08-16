import React, { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';
import { LocationInput } from './components/LocationInput';
import { CurrentWeather } from './components/CurrentWeather';
import { FiveDayForecast } from './components/FiveDayForecast';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { weatherService } from './services/weatherApi';
import { WeatherData, ForecastData } from './types/weather';
import { getWeatherBackground } from './utils/background';

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backgroundClass, setBackgroundClass] = useState('bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600');

  const fetchWeatherData = async (location: { name: string; coords?: { lat: number; lon: number } }) => {
    setLoading(true);
    setError(null);

    try {
      let weatherData: WeatherData;
      let forecastData: ForecastData;

      if (location.coords) {
        // Use coordinates for more accurate results
        [weatherData, forecastData] = await Promise.all([
          weatherService.getCurrentWeatherByCoords(location.coords.lat, location.coords.lon),
          weatherService.getFiveDayForecastByCoords(location.coords.lat, location.coords.lon)
        ]);
      } else {
        // Use city name
        [weatherData, forecastData] = await Promise.all([
          weatherService.getCurrentWeather(location.name),
          weatherService.getFiveDayForecast(location.name)
        ]);
      }

      setCurrentWeather(weatherData);
      setForecast(forecastData);

      // Update background based on weather
      const weatherCode = weatherData.weather[0].icon;
      const newBackground = getWeatherBackground(weatherCode);
      setBackgroundClass(newBackground);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Load default weather for New York on initial load
  useEffect(() => {
    fetchWeatherData({ name: 'New York, US' });
  }, []);

  const handleRetry = () => {
    if (currentWeather) {
      fetchWeatherData({ name: `${currentWeather.name}, ${currentWeather.sys.country}` });
    } else {
      fetchWeatherData({ name: 'New York, US' });
    }
  };

  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-1000 ease-in-out`}>
      <div className="min-h-screen bg-gradient-to-t from-black/20 to-transparent">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cloud className="w-10 h-10 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">WeatherCast Pro</h1>
            </div>
            <p className="text-white/80 text-lg">
              Professional weather forecasting with 5-day outlook
            </p>
          </header>

          {/* Location Search */}
          <div className="mb-8">
            <LocationInput onLocationSelect={fetchWeatherData} loading={loading} />
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto space-y-8">
            {loading && <LoadingSpinner />}
            
            {error && !loading && (
              <ErrorMessage message={error} onRetry={handleRetry} />
            )}

            {!loading && !error && currentWeather && (
              <CurrentWeather weather={currentWeather} />
            )}

            {!loading && !error && forecast && (
              <FiveDayForecast forecast={forecast} />
            )}
          </div>

          {/* Footer */}
          <footer className="text-center mt-12 pb-8">
            <p className="text-white/60 text-sm">
              Weather data provided by OpenWeatherMap API
            </p>
            <p className="text-white/50 text-xs mt-2">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;