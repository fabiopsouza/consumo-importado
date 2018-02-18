import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

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

  fuel: Fuel = new Fuel();

  fuelCreatedSubscription;
  loading;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    private provider: FuelProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.buildForm();  
  }

  save() {

    //Parse to number because of a bug in ionic (Issue #7121)
    this.fuel.kml = +this.fuel.kml;
    this.fuel.km100l = +this.fuel.km100l;
    this.fuel.date = new Date();

    this.loading.present();
    this.provider.save(this.fuel);
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  km100LKeyUp() {
    this.kmL.setValue(Math.round((100 / this.km100L.value) * 100) / 100);
  }

  kmLKeyUp() {
    this.km100L.setValue(Math.round((100 / this.kmL.value) * 100) / 100);
  }

  ionViewDidEnter() {

    this.loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...'
    });

    setTimeout(() => {
      this.km100LInput.setFocus();
    },150);
  }

  ionViewWillEnter(){
    this.fuelCreatedSubscription = this.provider.fuelCreatedEvent.subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'Consumo salvo com sucesso',
        duration: 1000,
        position: 'top'
      });
      this.loading.dismiss();
      toast.present();
      this.dismiss();
    });
  }

  ionViewWillLeave(){
    this.fuelCreatedSubscription.unsubscribe();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      km100L:['', Validators.required],
      kmL:['', Validators.required]
    });

    this.km100L = this.formGroup.controls['km100L'];
    this.kmL = this.formGroup.controls['kmL'];
  }
}
