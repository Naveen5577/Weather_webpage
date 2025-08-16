export const getWeatherBackground = (weatherCode: string, isNight: boolean = false) => {
  const code = weatherCode.toLowerCase();
  
  // Clear sky
  if (code === '01d') {
    return 'bg-gradient-to-br from-blue-400 via-blue-500 to-yellow-400';
  }
  if (code === '01n') {
    return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900';
  }
  
  // Few clouds
  if (code === '02d' || code === '02n') {
    return isNight
      ? 'bg-gradient-to-br from-indigo-800 via-blue-800 to-gray-700'
      : 'bg-gradient-to-br from-blue-400 via-blue-500 to-gray-400';
  }
  
  // Scattered/broken clouds
  if (code === '03d' || code === '03n' || code === '04d' || code === '04n') {
    return 'bg-gradient-to-br from-gray-600 via-gray-500 to-gray-700';
  }
  
  // Shower rain
  if (code === '09d' || code === '09n') {
    return 'bg-gradient-to-br from-gray-700 via-blue-600 to-blue-800';
  }
  
  // Rain
  if (code === '10d' || code === '10n') {
    return 'bg-gradient-to-br from-gray-600 via-blue-700 to-indigo-800';
  }
  
  // Thunderstorm
  if (code === '11d' || code === '11n') {
    return 'bg-gradient-to-br from-gray-900 via-purple-800 to-indigo-900';
  }
  
  // Snow
  if (code === '13d' || code === '13n') {
    return 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500';
  }
  
  // Mist/Fog
  if (code === '50d' || code === '50n') {
    return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
  }
  
  // Default
  return 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600';
};