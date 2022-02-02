import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { UserDTO } from "../../dto/UserDTO";
import { Observable } from 'rxjs';
import { OrderDTO } from "../../dto/OrderDTO";
import { RouteDetails } from "../../dto/response/RouteDetails";
import { UserOrdersResponse } from "../../dto/response/UserOrdersResponse";

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  baseUrl = 'http://35.211.20.205:8080/Taxi';


  constructor(private storage: StorageService, private httpClient: HttpClient) { }

  getActiveOrdersByUserId(): Observable<Array<OrderDTO>>{
    var userid = this.storage.getUserId();
    var page = this.storage.getPage();
    return this.httpClient.get<Array<OrderDTO>>(this.baseUrl+"/order/get/byUserId?type=active&userId="+userid+"&page="+page);
  }

  getAllOrdersByUserId(): Observable<UserOrdersResponse>{
    var userid = this.storage.getUserId();
    var page = this.storage.getPage();
    return this.httpClient.get<UserOrdersResponse>(this.baseUrl+"/order/get/byUserId?type=all&userId="+userid+"&page="+page);
  }

  getAllOrders(sort, filter, sortBy, sortOrder, filterBy, value): Observable<UserOrdersResponse>{
    var page = this.storage.getAdminPage();
    return this.httpClient.get<UserOrdersResponse>(this.baseUrl+"/admin/order/get/all?sort="+sort+"&filter="+filter+"&sortBy="+sortBy+"&sortOrder="+sortOrder+"&filterBy="+filterBy+"&value="+value+"&page="+page);
  }

  getOrderDetails(departureLng: string, departureLat: string, destinationLng: string, destinationLat: string, places:number): Observable<Array<RouteDetails>>{
    var payload = {
      departureLongitude: departureLng,
      departureLatitude: departureLat,
      destinationLongitude: destinationLng,
      destinationLatitude: destinationLat,
      numberOfPassengers: places
    };
    return this.httpClient.post<Array<RouteDetails>>(this.baseUrl+"/order/getRouteDetails", payload);
  }

  finishOrder(orderid: number){
    return this.httpClient.get(this.baseUrl+"/order/finish?orderId="+orderid);
  }

}
