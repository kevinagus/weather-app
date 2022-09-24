import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DayPipe } from '../pipes/day.pipe';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { WeatherIconComponent } from './components/weather-icon/weather-icon.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, DayPipe, LocationDetailComponent, WeatherIconComponent],
  exports: [
    DayPipe
  ]
})
export class HomePageModule { }
