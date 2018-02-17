import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Storage } from '@ionic/storage';

import { Fuel } from '../../model/Fuel';

@Injectable()
export class FuelProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) { }

  save(fuel: Fuel) {
    this.getAll()
      .then((fuels) => {
        
        fuels = fuels.reverse();
        fuel.id = this.generateKey();

        if(fuels.length == 0) {
          fuel.indicator = 0;
        }
        else {
          let last = fuels[fuels.length - 1];
          if (fuel.kml == last.kml) fuel.indicator = 0;
          else if (fuel.kml > last.kml) fuel.indicator = 1;
          else fuel.indicator = -1;
        }
        
        this.storage.set(fuel.id, fuel);
      });
  }

  getAll(){
    let fuels: Array<Fuel> = new Array<Fuel>();
    return this.storage.forEach((fuel: Fuel, key: string, iterationNumber: Number) => {
      fuels.push(fuel);
    })
    .then(() => {
      return Promise.resolve(fuels.reverse());
    })
    .catch((error) => {
      return Promise.reject(error);
    });
  }

  private generateKey(): string{
    return this.datepipe.transform(new Date(), "ddMMyyyyHHmmssSSS");
  }
}
