import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private localStorage: LocalStorageService) { }

  getUsername(): string {
    return this.localStorage.retrieve('username');
  }

  getUserId(): string {
    return this.localStorage.retrieve('id');
  }

  getToken(): string {
    return this.localStorage.retrieve('token');
  }

  getRefreshToken(): string {
    return this.localStorage.retrieve('refreshToken');
  }

  getLocale(){
    return this.localStorage.retrieve("locale");
  }

  getPage(){
      return this.localStorage.retrieve("page");
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  setUsername(username: string) {
    this.localStorage.store("username", username);
  }

  setId(id: string) {
    this.localStorage.store("id", id);
  }

  setToken(token: string) {
    this.localStorage.store("token", token);
  }

  setRefreshToken(refreshToken: string) {
    this.localStorage.store("refreshToken", refreshToken);
  }

  setLocale(locale: string){
    this.localStorage.store("locale", locale);
  }

  setPage(page: number){
    this.localStorage.store("page", page);
  }

  clear(){
    var locale = this.getLocale();
    this.localStorage.clear();
    this.setLocale(locale);
  }
}
