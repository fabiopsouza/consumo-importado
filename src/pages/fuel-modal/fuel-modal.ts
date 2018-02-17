import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { NavController, ViewController } from 'ionic-angular';

import { FuelProvider } from '../../providers/fuel/fuel';

import { Fuel } from '../../model/Fuel';

@Component({
  selector: 'page-fuel-modal',
  templateUrl: 'fuel-modal.html',
})
export class FuelModalPage {

  @ViewChild('focusInput') km100LInput;

  formGroup: FormGroup;
  km100L: AbstractControl;
  kmL: AbstractControl;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    private provider: FuelProvider) {
    this.buildForm();  
  }

  save() {
    console.log('teste');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngAfterViewInit() {
    //this.km100LInput.setFocus();
    let fuel = new Fuel();
    fuel.date = new Date();
    fuel.kml = 3;
    fuel.km100l = 3;

    this.provider.save(fuel);
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      km100L:['', Validators.required],
      kmL:['', Validators.required]
    });

    this.km100L = this.formGroup.controls['km100L'];
    this.kmL = this.formGroup.controls['kmL'];
  }
}
