import { Component, ViewChild } from '@angular/core';
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

  startDate: Date = new Date();
  endDate: Date = new Date();

  fuelCreatedSubscription;

  constructor(public modalCtrl: ModalController,
    public provider: FuelProvider,
    private datepipe: DatePipe) {
    this.filter = 'month';
  }

  openFuelModal(){
    let modal = this.modalCtrl.create(FuelModalPage);
    modal.present();
  }

  onChangeSegment(){
    this.buildSegmentedGraph();
  }

  buildSegmentedGraph(){
    this.setSegmentDates();

    let reverse = false;
    this.provider.getAll(reverse)
      .then((fuels) => {

        this.kmlDates = [];
        this.kmlFuels = [];
        this.km100lDates = [];
        this.km100lFuels = [];
        
        fuels = this.getFiltred(fuels);

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

  private setSegmentDates(){

    let factor;

    if('week' == this.filter) factor = 7;
    else if('month' == this.filter) factor = 31;
    else factor = 365;

    var now = new Date();
    now.setHours(0,0,0,0);

    this.endDate = now;
    this.startDate = this.subDays(this.endDate, factor);

    this.startDate.setHours(0,0,0,0);
    this.endDate.setHours(23,59,59,999);
  }

  private getFiltred(list: Fuel[]): Fuel[] {
    
    let filtred: Fuel[] = [];
    
    list.forEach((item) => {
      if(item.date >= this.startDate && item.date <= this.endDate) 
        filtred.push(item);
    });

    return filtred;
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

  private getFormattedDate(date): string{
    return this.datepipe.transform(date, "dd/MM/yyyy");
  }

  private subDays(date: Date, days: number){
    let _24HoursInMilliseconds = 86400000;
    let subDate = new Date(date.getTime() - (days * _24HoursInMilliseconds));
    subDate.setHours(0,0,0,0);
    return subDate;
  }

  //
  // LIFE CYCLE
  
  ionViewDidEnter() {
    this.buildSegmentedGraph();
  }

  ionViewWillEnter(){
    this.fuelCreatedSubscription = this.provider.fuelCreatedEvent.subscribe(() => {
      this.buildSegmentedGraph();
    });
  }

  ionViewWillLeave(){
    this.fuelCreatedSubscription.unsubscribe();
  }

  //
  // TESTS

  testSegment(){
    //week
    let d1 = new Date(2018, 1, 18);
    let d2 = new Date(2018, 1, 16);

    //month
    let d3 = new Date(2018, 0, 31);
    let d4 = new Date(2018, 1, 15);

    //year
    let d5 = new Date(2017, 4, 23);
    let d6 = new Date(2017, 10, 3);

    //out
    let d7 = new Date(2015, 6, 1);
    let d8 = new Date(2015, 7, 20);
    
    this.testNewFuel(d1);
    this.testNewFuel(d2);
    this.testNewFuel(d3);
    this.testNewFuel(d4);
    this.testNewFuel(d5);
    this.testNewFuel(d6);
    this.testNewFuel(d7);
    this.testNewFuel(d8);
  }

  testNewFuel(date: Date) {
    let f = new Fuel();
    f.kml = this.randomNumber();
    f.km100l = this.randomNumber();
    f.date = date;
  
    this.provider.save(f);
  }

  test() {
    for(let i = 0; i < 30; i++) this.testNewFuel(this.randomDate(new Date(2018,0,1), new Date(2018,11,30)));
  }

  randomNumber(): number {
    var precision = 100; // 2 decimals
    return Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);
  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
