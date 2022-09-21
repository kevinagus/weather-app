import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  locationForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private locationService: LocationService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
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
      //TODO handle user input
      console.log(this.locationForm.value);
      this.retrieveCityInfos(this.locationForm.value.city);
    }
  }

  private retrieveCityInfos(city: string) {
    this.locationService.retrieveCityCoordinates(city).subscribe(
      (res) => {
        console.log(res);
      },
      async (err) => {
        if (err) {
          //TODO show alert/toast
          
          // const toast = await this.toastController.create({
          //   message: 'City Not Found',
          //   position: 'bottom',
          //   duration: 2000,
          //   color: 'warning',
          //   buttons: [
          //     {
          //       side: 'start',
          //       icon: 'star',
          //       text: 'Favorite',
          //       handler: () => {
          //         console.log('Favorite clicked');
          //       }
          //     }, {
          //       text: 'Done',
          //       role: 'cancel',
          //       handler: () => {
          //         console.log('Cancel clicked');
          //       }
          //     }
          //   ]
          // });
          // toast.present();
        }
      }
    );
  }
}
