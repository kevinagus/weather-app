import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageLocation } from '../models/location';
import { WeatherData } from '../models/weather-data';
import { StorageService } from '../services/storage.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  response: WeatherData;
  private sub;
  private locationId: number;
  locations: StorageLocation[] = [];
  location: StorageLocation;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherAPI: WeatherService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.storageService.getLocations().then((res) => {
      this.locations = res;
      this.sub = this.activatedRoute.paramMap.subscribe((params) => {
        this.locationId = +params.get('id');
        this.getLocationWeather();
      });
    });
  }

  private getLocationWeather() {
    this.location = this.locations.find((l) => l.id === this.locationId);
    this.weatherAPI.getWeatherData(this.location.latlng).subscribe(
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
