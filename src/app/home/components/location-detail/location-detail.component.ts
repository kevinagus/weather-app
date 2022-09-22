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

  constructor() {}

  ngOnInit() {}
}
