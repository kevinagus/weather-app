import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  locationForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.locationForm = this.formBuilder.group({
      city:['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]]
    })
  }

  get errorControl() {
    return this.locationForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.locationForm.valid) {
      //TODO handle user input
      console.log(this.locationForm.value);
    }
  }

}
