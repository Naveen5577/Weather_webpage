import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { weatherService } from '../services/weatherApi';
import { LocationData } from '../types/weather';

interface LocationInputProps {
  onLocationSelect: (location: { name: string; coords?: { lat: number; lon: number } }) => void;
  loading: boolean;
}

export const LocationInput: React.FC<LocationInputProps> = ({ onLocationSelect, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchLocations = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await weatherService.searchLocations(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error searching locations:', error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchLocations, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (location: LocationData) => {
    setQuery(`${location.name}, ${location.country}`);
    setShowSuggestions(false);
    onLocationSelect({
      name: `${location.name}, ${location.country}`,
      coords: { lat: location.lat, lon: location.lon }
    });
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationSelect({
          name: 'Current Location',
          coords: { lat: latitude, lon: longitude }
        });
        setQuery('Current Location');
        setGeoLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter a city name.');
        setGeoLoading(false);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onLocationSelect({ name: query.trim() });
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-12 py-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
            disabled={loading}
          />
          {(isSearching || loading) && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5 animate-spin" />
          )}
        </div>
      </form>

      <button
        onClick={handleCurrentLocation}
        disabled={geoLoading || loading}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {geoLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <MapPin className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">
          {geoLoading ? 'Getting location...' : 'Use current location'}
        </span>
      </button>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden z-50 shadow-lg"
        >
          {suggestions.map((location, index) => (
            <button
              key={`${location.lat}-${location.lon}-${index}`}
              onClick={() => handleLocationSelect(location)}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-150 flex items-center gap-2 border-b border-white/10 last:border-b-0"
            >
              <MapPin className="w-4 h-4 text-white/70" />
              <span className="font-medium">{location.name}</span>
              {location.state && <span className="text-white/70">, {location.state}</span>}
              <span className="text-white/70">, {location.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};