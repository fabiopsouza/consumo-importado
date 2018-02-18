import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { HistoricPage } from '../pages/historic/historic';
import { FuelModalPage } from '../pages/fuel-modal/fuel-modal';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HistoricPopoverPage } from '../pages/historic-popover/historic-popover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FuelProvider } from '../providers/fuel/fuel';

@NgModule({
  declarations: [
    MyApp,
    HistoricPage,
    HomePage,
    TabsPage,
    FuelModalPage,
    HistoricPopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HistoricPage,
    HomePage,
    TabsPage,
    FuelModalPage,
    HistoricPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FuelProvider,
    DatePipe
  ]
})
export class AppModule {}
