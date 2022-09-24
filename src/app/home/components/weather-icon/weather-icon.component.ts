import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss'],
})
export class WeatherIconComponent implements OnInit {
  @Input() weathercode: number;
  @Input() size: string;

  constructor() { }

  ngOnInit() {}

}
