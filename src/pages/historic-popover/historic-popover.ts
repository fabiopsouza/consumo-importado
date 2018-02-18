import { Component } from '@angular/core';

import { ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { FuelProvider } from '../../providers/fuel/fuel';

@Component({
  selector: 'page-historic-popover',
  templateUrl: 'historic-popover.html',
})
export class HistoricPopoverPage {

  fuelAllRemovedSubscription;
  loading;

  constructor(public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public provider: FuelProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {}

  removeAll() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Tem certeza que deseja excluir todos os consumos?',
      buttons: [
        { text: 'Cancelar' },
        { text: 'Sim', handler: () => { 
          this.loading.present();    
          this.provider.removeAll(); 
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewWillEnter(){
    this.loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...'
    });
    this.fuelAllRemovedSubscription = this.provider.fuelAllRemovedEvent.subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'Todos os consumos foram removidos',
        duration: 1000,
        position: 'top'
      });
      toast.present();
      this.viewCtrl.dismiss();
    });
  }

  ionViewWillUnload(){
    this.loading.dismiss();
    this.fuelAllRemovedSubscription.unsubscribe();
  }
}
