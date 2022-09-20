export class WeatherData {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current_weather: CurrentWeather
    daily_units: DailyUnits
    daily: Daily
  }
  
  export class CurrentWeather {
    temperature: number
    windspeed: number
    winddirection: number
    weathercode: number
    time: string
  }
  
  export class DailyUnits {
    time: string
    weathercode: string
    temperature_2m_max: string
    temperature_2m_min: string
    sunrise: string
    sunset: string
  }
  
  export class Daily {
    time: string[]
    weathercode: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    sunrise: string[]
    sunset: string[]
  }
  