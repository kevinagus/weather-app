import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationsPageRoutingModule } from './locations-routing.module';

import { LocationsPage } from './locations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LocationsPage]
})
export class LocationsPageModule {}
