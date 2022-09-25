import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
  loading: HTMLIonLoadingElement;
  private readonly TOAST_DANGER = 'danger';
  private readonly WEATHER_SERVICE_ERROR = 'Service unavailable';

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherAPI: WeatherService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    public toastController: ToastController
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
    this.showLoading();
    this.location = this.locations.find((l) => l.id === this.locationId);
    this.weatherSub = this.weatherAPI
      .getWeatherData(this.location.latlng)
      .subscribe(
        (res) => {
          this.response = res;
          this.loading.dismiss();
        },
        async () => {
          const toast = await this.toastController.create({
            message: this.WEATHER_SERVICE_ERROR,
            position: 'bottom',
            duration: 2000,
            color: this.TOAST_DANGER,
          });
          toast.present();
        }
      );
  }

  doRefresh(event) {
    this.getLocationWeather();
    event.target.complete();
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading data...',
      duration: 5000,
    });
    this.loading.present();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.weatherSub.unsubscribe();
  }
}
