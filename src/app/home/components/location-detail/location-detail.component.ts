import { Component, Input, OnInit } from '@angular/core';
import { StorageLocation } from 'src/app/models/location';
import { WeatherData } from 'src/app/models/weather-data';

@Component({
  selector: 'home-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss'],
})
export class LocationDetailComponent implements OnInit {
  @Input() weatherData: WeatherData;
  @Input() location: StorageLocation;

  public get description(): string {
    switch (this.weatherData.current_weather.weathercode) {
      case 0:
        return 'Sunny';
      case 1:
      case 2:
      case 3:
        return 'Cloudy';
      case 45:
      case 48:
        return 'Fog';
      case 51:
      case 53:
      case 55:
        return 'Drizzle';
      case 56:
      case 57:
        return 'Freezing Drizzle';
      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
      case 95:
      case 96:
      case 99:
        return 'Rain';
      case 66:
      case 67:
        return 'Freezing Rain';
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return 'Snow';
    }
  }

  constructor() {}

  ngOnInit() {}
}
