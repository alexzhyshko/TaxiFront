import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { UserDTO } from "../../dto/UserDTO";
import { Observable } from 'rxjs';
import { OrderDTO } from "../../dto/OrderDTO";
import { RouteDetails } from "../../dto/response/RouteDetails";

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  baseUrl = 'http://localhost:8080/Taxi';


  constructor(private storage: StorageService, private httpClient: HttpClient) { }

  getActiveOrdersByUserId(): Observable<Array<OrderDTO>>{
    var userid = this.storage.getUserId();
    return this.httpClient.get<Array<OrderDTO>>(this.baseUrl+"/order/get/active/byUserId/"+userid);
  }

  getOrderDetails(departureLng: string, departureLat: string, destinationLng: string, destinationLat: string, category:string, places:number): Observable<RouteDetails>{
    var payload = {
      departureLongitude: departureLng,
      departureLatitude: departureLat,
      destinationLongitude: destinationLng,
      destinationLatitude: destinationLat,
      numberOfPassengers: places,
      carCategory: category
    };
    return this.httpClient.post<RouteDetails>(this.baseUrl+"/order/getRouteDetails", payload);
  }

}
