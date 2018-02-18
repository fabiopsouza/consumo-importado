import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricPopoverPage } from './historic-popover';

@NgModule({
  declarations: [
    HistoricPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricPopoverPage),
  ],
})
export class HistoricPopoverPageModule {}
