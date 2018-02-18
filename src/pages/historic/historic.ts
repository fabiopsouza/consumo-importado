import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController, LoadingController } from 'ionic-angular';

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
  fuelAllRemovedSubscription;
  loading;

  constructor(public navCtrl: NavController, 
    public provider: FuelProvider,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController) {  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(HistoricPopoverPage);
    popover.present({ ev: event });
  }

  remove(id: string){
    let confirm = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Tem certeza que deseja excluir o consumo?',
      buttons: [
        { text: 'Cancelar' },
        { text: 'Sim', handler: () => { this.provider.remove(id); } }
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
    this.loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...'
    });
    this.fuelRemovedSubscription = this.provider.fuelRemovedEvent.subscribe(() => {
      this.getFuels();
    });
    this.fuelAllRemovedSubscription = this.provider.fuelAllRemovedEvent.subscribe(() => {
      this.loading.dismiss();
      this.getFuels();
    });
  }

  ionViewWillLeave(){
    this.fuelRemovedSubscription.unsubscribe();
    this.fuelAllRemovedSubscription.unsubscribe();
  }
}
