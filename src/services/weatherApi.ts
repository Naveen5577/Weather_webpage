const API_KEY = 'demo_key'; // Users will need to replace this with their own API key
const BASE_URL = 'https://api.openweathermap.org';

export class WeatherService {
  private static instance: WeatherService;
  private apiKey: string;

  private constructor() {
    this.apiKey = API_KEY;
  }

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  public setApiKey(key: string): void {
    this.apiKey = key;
  }

  private async makeRequest(endpoint: string, params: Record<string, string | number>): Promise<any> {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('appid', this.apiKey);
    url.searchParams.append('units', 'metric');
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (response.status === 404) {
        throw new Error('Location not found. Please check the city name.');
      } else {
        throw new Error(`Weather service error: ${response.statusText}`);
      }
    }

    return response.json();
  }

  public async getCurrentWeather(city: string): Promise<any> {
    return this.makeRequest('/data/2.5/weather', { q: city });
  }

  public async getCurrentWeatherByCoords(lat: number, lon: number): Promise<any> {
    return this.makeRequest('/data/2.5/weather', { lat, lon });
  }

  public async getFiveDayForecast(city: string): Promise<any> {
    return this.makeRequest('/data/2.5/forecast', { q: city });
  }

  public async getFiveDayForecastByCoords(lat: number, lon: number): Promise<any> {
    return this.makeRequest('/data/2.5/forecast', { lat, lon });
  }

  public async searchLocations(query: string): Promise<any[]> {
    if (query.length < 3) return [];
    return this.makeRequest('/geo/1.0/direct', { q: query, limit: 5 });
  }
}

export const weatherService = WeatherService.getInstance();