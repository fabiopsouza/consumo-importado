import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Fuel } from '../../model/Fuel';
import { FuelProvider } from '../../providers/fuel/fuel';

@Component({
  selector: 'page-historic',
  templateUrl: 'historic.html'
})
export class HistoricPage {

  fuels: Array<Fuel> = new Array<Fuel>();

  constructor(public navCtrl: NavController, private provider: FuelProvider) {  }

  ionViewDidEnter() {
    this.provider.getAll()
      .then((result) => {
        this.fuels = result;
      });
  }
}
