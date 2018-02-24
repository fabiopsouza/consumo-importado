import { Injectable, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Storage } from '@ionic/storage';

import { Fuel } from '../../model/Fuel';

@Injectable()
export class FuelProvider {

  fuelCreatedEvent = new EventEmitter();
  fuelRemovedEvent = new EventEmitter();
  fuelAllRemovedEvent = new EventEmitter();

  constructor(private storage: Storage, private datepipe: DatePipe) { }

  save(fuel: Fuel) {
    let reverse = false;
    this.getAll(reverse)
      .then((fuels) => {
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
      	
        this.storage.set(fuel.id, fuel).then(() => {
          this.fuelCreatedEvent.emit();
        });
      });
  }

  getAll(reverse: boolean){
    let fuels: Array<Fuel> = new Array<Fuel>();
    return this.storage.forEach((fuel: Fuel, key: string, iterationNumber: Number) => {
      fuels.push(fuel);
    })
    .then(() => {
      return Promise.resolve(reverse ? fuels.reverse() : fuels);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
  }

  remove(id: string){
    this.storage.remove(id);
    this.fuelRemovedEvent.emit();
  }

  removeAll() {
    this.storage.clear();
    this.fuelAllRemovedEvent.emit();
  }

  private generateKey(): string{
    return this.datepipe.transform(new Date(), "ddMMyyyyHHmmssSSS");
  }
}
