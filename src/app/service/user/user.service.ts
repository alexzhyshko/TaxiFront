import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { UserDTO } from "../../dto/UserDTO";
import { OrderDTO } from "../../dto/OrderDTO";
import { CarDTO } from "../../dto/CarDTO";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  baseUrl = 'http://localhost:8080/Taxi';

  constructor(private storage: StorageService, private httpClient: HttpClient) {

  }

  getAllCars(): Observable<Array<CarDTO>> {
    return this.httpClient.get<Array<CarDTO>>(this.baseUrl + '/car/getAll');
  }

  getCurrentUserById(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.baseUrl + '/user/getById?userId' + this.storage.getUserId());
  }

  getCurrentUserByUsername(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.baseUrl + '/user/getByUsername?username=' + this.storage.getUsername());
  }

  async getCurrentUserPromiseByUsername() {
    const response = await this.httpClient.get<UserDTO>(this.baseUrl + '/user/getByUsername?username=' + this.storage.getUsername()).toPromise();
    return response;
  }

  setUserId(userid: string){
    this.storage.setId(userid);
  }

  setLocale(locale: string){
    this.storage.setLocale(locale);
  }

  setPage(page: number){
    this.storage.setPage(page);
  }

  setAdminPage(page: number){
    this.storage.setAdminPage(page);
  }

  getLocale(){
    return this.storage.getLocale();
  }

  getActivePage(){
    return this.storage.getPage();
  }

  getActiveAdminPage(){
    return this.storage.getAdminPage();
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
