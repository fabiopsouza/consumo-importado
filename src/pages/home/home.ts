import { Component, ViewChild, ElementRef} from '@angular/core';
import { DatePipe } from '@angular/common';

import { ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { FuelModalPage } from '../fuel-modal/fuel-modal';
import { FuelProvider } from '../../providers/fuel/fuel';
import { Fuel } from '../../model/Fuel';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  filter: string;

  @ViewChild('kmlCanvas') kmlCanvas;
  kmlChart: any;

  @ViewChild('km100lCanvas') km100lCanvas;
  km100lChart: any;

  kmlDates: string[];
  kmlFuels: Number[];
  km100lDates: string[];
  km100lFuels: Number[];

  constructor(public modalCtrl: ModalController,
    public provider: FuelProvider,
    private datepipe: DatePipe) {
    this.filter = 'month';
  }

  openFuelModal(){
    let modal = this.modalCtrl.create(FuelModalPage);
    modal.present();
  }

  ionViewDidEnter() {
    let noReverse = false;
    this.provider.getAll(noReverse)
      .then((fuels) => {

        this.kmlDates = [];
        this.kmlFuels = [];
        this.km100lDates = [];
        this.km100lFuels = [];

        fuels.forEach((fuel) => {
          this.kmlDates.push(this.getFormattedDate(fuel.date));
          this.kmlFuels.push(fuel.kml);

          this.km100lDates.push(this.getFormattedDate(fuel.date));
          this.km100lFuels.push(fuel.km100l);
        });
        
        this.buildChart('Consumo em Km/L', this.kmlChart, this.kmlCanvas, this.kmlDates, this.kmlFuels);
        this.buildChart('Autonomia em Km/100L', this.km100lChart, this.km100lCanvas, this.km100lDates, this.km100lFuels);
      });
  }

  private getFormattedDate(date): string{
    return this.datepipe.transform(date, "dd/MM/yyyy");
  }

  buildChart(title, chart, canvas, labels, data) {
    chart = new Chart(canvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          fill: false,
          backgroundColor: "#488aff",
          borderColor: "#488aff",
          data: data
        }]
      },
      options: { legend: { onClick: (e) => e.stopPropagation() }}
    });
  }

  test() {
    for(let i = 0; i < 30; i++){
      let f = new Fuel();
      f.kml = this.randomNumber();
      f.km100l = this.randomNumber();
      f.date = this.randomDate(new Date(2018,0,1), new Date(2018,11,30));
    
      console.log(f);
      this.provider.save(f);
    }
  }

  randomNumber(): number {
    var precision = 100; // 2 decimals
    return Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);
  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
