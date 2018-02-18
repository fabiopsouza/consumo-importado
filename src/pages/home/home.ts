import { Component, ViewChild} from '@angular/core';

import { ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { FuelModalPage } from '../fuel-modal/fuel-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  kmlDates: string[];
  kmlFuels: Number[];
  km100lDates: string[];
  km100lFuels: Number[];

  constructor(public modalCtrl: ModalController) {}

  openFuelModal(){
    let modal = this.modalCtrl.create(FuelModalPage);
    modal.present();
  }

  ionViewDidLoad() {
    
    //set graph Values

    this.buildChart();
  }

  buildChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.kmlDates,
        datasets: [{
          label: "Consumo em Km/L",
          fill: false,
          backgroundColor: "#488aff",
          borderColor: "#488aff",
          data: this.kmlFuels
        }]
      },
      options: { legend: { onClick: (e) => e.stopPropagation() } }
    });
  }
}
