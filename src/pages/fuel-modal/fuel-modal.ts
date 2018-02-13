import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-fuel-modal',
  templateUrl: 'fuel-modal.html',
})
export class FuelModalPage {

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController) {}

  save() {
    console.log('teste');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
