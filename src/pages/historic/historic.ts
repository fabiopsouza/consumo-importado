import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController } from 'ionic-angular';

import { Fuel } from '../../model/Fuel';
import { FuelProvider } from '../../providers/fuel/fuel';
import { HistoricPopoverPage } from '../historic-popover/historic-popover';

@Component({
  selector: 'page-historic',
  templateUrl: 'historic.html'
})
export class HistoricPage {

  fuels: Array<Fuel> = new Array<Fuel>();
  fuelRemovedSubscription;

  constructor(public navCtrl: NavController, 
    private provider: FuelProvider,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController) {  }

  presentPopover() {
    let popover = this.popoverCtrl.create(HistoricPopoverPage);
    popover.present();
  }

  remove(id: string){
    let confirm = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Tem certeza que deseja excluir o consumo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Sim',
          handler: () => {
            this.provider.remove(id);
          }
        }
      ]
    });
    confirm.present();
  }

  getFuels(){
    this.provider.getAll()
      .then((result) => {
        this.fuels = result;
      });
  }

  ionViewDidEnter() {
    this.getFuels();
  }

  ionViewWillEnter(){
    this.fuelRemovedSubscription = this.provider.fuelRemovedEvent.subscribe(() => {
      this.getFuels();
    });
  }

  ionViewWillLeave(){
    this.fuelRemovedSubscription.unsubscribe();
  }
}
