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
  private routeSub;
  private weatherSub;
  private locationId: string;
  response: WeatherData;
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
      this.routeSub = this.activatedRoute.paramMap.subscribe((params) => {
        this.locationId = params.get('id');
        this.getLocationWeather();
      });
    });
  }

  private getLocationWeather() {
    this.location = this.locations.find((l) => l.id === this.locationId);
    this.weatherSub = this.weatherAPI
      .getWeatherData(this.location.latlng)
      .subscribe(
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
    this.routeSub.unsubscribe();
    this.weatherSub.unsubscribe()
  }
}
