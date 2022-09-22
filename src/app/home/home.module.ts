import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DayPipe } from '../pipes/day.pipe';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, DayPipe, LocationDetailComponent],
  exports: [
    DayPipe
  ]
})
export class HomePageModule { }
