import { Component } from '@angular/core';
import { WeatherData } from '../models/weather-data';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  response: WeatherData;

  constructor(private weatherAPI: WeatherService) {}

  ngOnInit() {
    this.getLocationWeather();
  }

  getLocationWeather() {
    this.weatherAPI.getWeatherData().subscribe(
      (res) => {
        this.response = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  doRefresh(event) {
    this.getLocationWeather();
    event.target.complete();
  }
}
