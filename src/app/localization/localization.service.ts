import { Injectable } from '@angular/core';
import { StorageService } from '../service/storage/storage.service';
import * as localization from '../localization.json'

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private localStorage: StorageService) { }


  getLocalizedDestination(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.destination.EN;
    }else if(locale==="RU"){
      return localization.destination.RU;
    }else if(locale==="UA"){
      return localization.destination.UA;
    }
  }

  getLocalizedDeparture(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.departure.EN;
    }else if(locale==="RU"){
      return localization.departure.RU;
    }else if(locale==="UA"){
      return localization.departure.UA;
    }
  }

  getLocalizedClear(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.clear.EN;
    }else if(locale==="RU"){
      return localization.clear.RU;
    }else if(locale==="UA"){
      return localization.clear.UA;
    }
  }

  getLocalizedPassengerCount(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.passengerCount.EN;
    }else if(locale==="RU"){
      return localization.passengerCount.RU;
    }else if(locale==="UA"){
      return localization.passengerCount.UA;
    }
  }

  getLocalizedPickPoint(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.pickPoint.EN;
    }else if(locale==="RU"){
      return localization.pickPoint.RU;
    }else if(locale==="UA"){
      return localization.pickPoint.UA;
    }
  }

}
