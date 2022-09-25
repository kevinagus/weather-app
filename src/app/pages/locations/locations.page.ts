import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { StorageLocation } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  private coordinatesSub;
  locationForm: FormGroup;
  isSubmitted: boolean = false;
  favouriteLocations: StorageLocation[] = [];
  private readonly CITY_REMOVED = 'City Removed';
  private readonly CITY_ADDED = 'City Added';
  private readonly CITY_NOT_ADDED = 'City Not Added';
  private readonly CITY_NOT_FOUND = 'City Not Found';
  private readonly TOAST_SUCCESS = 'success';
  private readonly TOAST_WARNING = 'warning';
  private readonly TOAST_DANGER = 'danger';

  constructor(
    public formBuilder: FormBuilder,
    private locationService: LocationService,
    private storageService: StorageService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.storageService.getLocations().then((res) => {
      this.favouriteLocations = res;
    });
    this.locationForm = this.formBuilder.group({
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    });
  }

  get errorControl() {
    return this.locationForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.locationForm.valid) {
      this.retrieveCityInfos(this.locationForm.value.city);
    }
  }

  private retrieveCityInfos(city: string) {
    this.coordinatesSub = this.locationService
      .retrieveCityCoordinates(city)
      .subscribe(
        (res) => {
          if (res && res.length === 1) {
            return this.storeCity(res[0]);
          }
        },
        async () => {
          this.showToastMessage(this.CITY_NOT_FOUND, this.TOAST_DANGER);
        }
      );
  }

  private async storeCity(response) {
    if (
      response &&
      response.capital[0] &&
      response.capitalInfo &&
      response.capitalInfo.latlng
    ) {
      const favourite = new StorageLocation(
        uuidv4(),
        response.capital[0],
        response.capitalInfo.latlng
      );
      const cityAdded = await this.storageService.setLocations(favourite);
      if (cityAdded) {
        this.resetForm();
        this.favouriteLocations = await this.storageService.getLocations();
        this.showToastMessage(this.CITY_ADDED, this.TOAST_SUCCESS);
      }
    } else {
      this.showToastMessage(this.CITY_NOT_ADDED, this.TOAST_WARNING);
    }
  }

  private resetForm() {
    this.locationForm.reset();
    this.isSubmitted = false;
  }

  async onDeleteClick(id: string) {
    this.storageService.deleteLocation(id).then(async () => {
      this.favouriteLocations = await this.storageService.getLocations();
      this.showToastMessage(this.CITY_REMOVED, this.TOAST_SUCCESS);
    });
  }

  async showToastMessage(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 2000,
      color,
    });
    toast.present();
  }

  ngOnDestroy() {
    this.coordinatesSub.unsubscribe();
  }
}
