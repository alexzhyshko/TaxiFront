import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { UserDTO } from "../../dto/UserDTO";
import { Observable } from 'rxjs';
import { OrderDTO } from "../../dto/OrderDTO";

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

}
