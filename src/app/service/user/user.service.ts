import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { UserDTO } from "../../dto/UserDTO";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {



  baseUrl = 'http://localhost:8080/Taxi';

  constructor(private storage: StorageService, private httpClient: HttpClient) {

  }

  getCurrentUserById(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.baseUrl + '/user/getById?userId' + this.storage.getUserId());
  }

  getCurrentUserByUsername(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.baseUrl + '/user/getByUsername?username=' + this.storage.getUsername());
  }

  order(departureLng: string, departureLat: string, destinationLng: string, destinationLat: string, category: string, places:number, anyCategory: boolean, anyCountOfCars: boolean): Observable<OrderDTO> {
    var payload = {
      departureLongitude: departureLng,
      departureLatitude: departureLat,
      destinationLongitude: destinationLng,
      destinationLatitude: destinationLat,
      numberOfPassengers: places,
      carCategory: category
    };
    return this.httpClient.post<OrderDTO>(this.baseUrl + '/order/create?anyCategory='+anyCategory+'&anyCountOfCars='+anyCountOfCars, payload);
  }

}
