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

  constructor(private storage: StorageService, private httpClient: HttpClient) { }

  getCurrentUserById(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.baseUrl + '/user/getById?userId' + this.storage.getUserId());
  }

  getCurrentUserByUsername(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.baseUrl + '/user/getByUsername?username=' + this.storage.getUsername());
  }

}
