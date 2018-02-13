import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-fuel-modal',
  templateUrl: 'fuel-modal.html',
})
export class FuelModalPage {

  @ViewChild('focusInput') km100LInput;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController) {}

  save() {
    console.log('teste');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngAfterViewInit() {
    this.km100LInput.setFocus();
  }
}
