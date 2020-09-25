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

  getLocalizedSlogan(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.slogan.EN;
    }else if(locale==="RU"){
      return localization.slogan.RU;
    }else if(locale==="UA"){
      return localization.slogan.UA;
    }
  }

  getLocalizedContactMe(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.contact.EN;
    }else if(locale==="RU"){
      return localization.contact.RU;
    }else if(locale==="UA"){
      return localization.contact.UA;
    }
  }

  getLocalizedAdminDashboard(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.adminDashboard.EN;
    }else if(locale==="RU"){
      return localization.adminDashboard.RU;
    }else if(locale==="UA"){
      return localization.adminDashboard.UA;
    }
  }

  getLocalizedSortBy(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.sortBy.EN;
    }else if(locale==="RU"){
      return localization.sortBy.RU;
    }else if(locale==="UA"){
      return localization.sortBy.UA;
    }
  }

  getLocalizedDateLabel(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.date.EN;
    }else if(locale==="RU"){
      return localization.date.RU;
    }else if(locale==="UA"){
      return localization.date.UA;
    }
  }

  getLocalizedPriceLabel(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.price.EN;
    }else if(locale==="RU"){
      return localization.price.RU;
    }else if(locale==="UA"){
      return localization.price.UA;
    }
  }

  getLocalizedOrderLabel(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.order.EN;
    }else if(locale==="RU"){
      return localization.order.RU;
    }else if(locale==="UA"){
      return localization.order.UA;
    }
  }

  getLocalizedAscLabel(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.asc.EN;
    }else if(locale==="RU"){
      return localization.asc.RU;
    }else if(locale==="UA"){
      return localization.asc.UA;
    }
  }

  getLocalizedDescLabel(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.desc.EN;
    }else if(locale==="RU"){
      return localization.desc.RU;
    }else if(locale==="UA"){
      return localization.desc.UA;
    }
  }

  getLocalizedFilterLabel(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.filter.EN;
    }else if(locale==="RU"){
      return localization.filter.RU;
    }else if(locale==="UA"){
      return localization.filter.UA;
    }
  }

  getLocalizedUserLabel(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.user.EN;
    }else if(locale==="RU"){
      return localization.user.RU;
    }else if(locale==="UA"){
      return localization.user.UA;
    }
  }

  getLocalizedApplyLabel(){
    var locale = this.localStorage.getLocale();
    if(locale==="EN"){
      return localization.apply.EN;
    }else if(locale==="RU"){
      return localization.apply.RU;
    }else if(locale==="UA"){
      return localization.apply.UA;
    }
  }

}
