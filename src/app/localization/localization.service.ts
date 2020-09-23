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

  getLocalizedMin(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.min.EN;
    }else if(locale==="RU"){
      return localization.min.RU;
    }else if(locale==="UA"){
      return localization.min.UA;
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

  getLocalizedGeocoderPlaceholder(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.geocoderPlaceholer.EN;
    }else if(locale==="RU"){
      return localization.geocoderPlaceholer.RU;
    }else if(locale==="UA"){
      return localization.geocoderPlaceholer.UA;
    }
  }

  getLocalizedMyOrders(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.myOrders.EN;
    }else if(locale==="RU"){
      return localization.myOrders.RU;
    }else if(locale==="UA"){
      return localization.myOrders.UA;
    }
  }

  getLocalizedFinishOrder(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.finishOrder.EN;
    }else if(locale==="RU"){
      return localization.finishOrder.RU;
    }else if(locale==="UA"){
      return localization.finishOrder.UA;
    }
  }

  getLocalizedDriverArrives(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.driverArrives.EN;
    }else if(locale==="RU"){
      return localization.driverArrives.RU;
    }else if(locale==="UA"){
      return localization.driverArrives.UA;
    }
  }

  getLocalizedMinutes(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.minutes.EN;
    }else if(locale==="RU"){
      return localization.minutes.RU;
    }else if(locale==="UA"){
      return localization.minutes.UA;
    }
  }



}
