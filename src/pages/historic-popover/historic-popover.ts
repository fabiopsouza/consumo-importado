import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-historic-popover',
  templateUrl: 'historic-popover.html',
})
export class HistoricPopoverPage {

  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
