import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';

import { FuelModalPage } from '../fuel-modal/fuel-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public modalCtrl: ModalController) {}

  openFuelModal(){
    let modal = this.modalCtrl.create(FuelModalPage);
    modal.present();
  }
}
