import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { LogoutRequest } from '../../dto/request/LogoutRequest';
import { LoginRequest } from '../../dto/request/LoginRequest';
import { RegisterRequest } from '../../dto/request/RegisterRequest';
import { LoginResponse } from '../../dto/response/LoginResponse';
import { RefreshTokenResponse } from '../../dto/response/RefreshTokenResponse';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient,
    private localStorage: StorageService) { }


  register(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post('http://localhost:8080/Taxi/register', registerRequest, { responseType: 'text' });
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/Taxi/login',
      loginRequest).pipe(map(data => {
        console.log(data);

        this.localStorage.setUsername(data.username);
        this.localStorage.setToken(data.token);
        this.localStorage.setRefreshToken(data.refreshToken);
        return true;
      }));
  }

  refreshToken() {
    return this.httpClient.get<RefreshTokenResponse>('http://localhost:8080/Taxi/refreshToken?refreshToken='+this.localStorage.getRefreshToken()+"&token="+this.localStorage.getToken()+"&username="+this.localStorage.getUsername())
      .pipe(tap(response => {
        this.localStorage.setToken(response.token);
        this.localStorage.setRefreshToken(response.refreshToken);
      }));
  }

  logout() {
    var refreshToken = this.localStorage.getRefreshToken();
    var token = this.localStorage.getToken();
    this.localStorage.clear();
    const logoutPayload = {
      refreshToken: refreshToken,
      token: token
    }
    this.httpClient.post("http://localhost:8080/Taxi/logout", logoutPayload);
  }

  isLoggedIn(){
    return this.localStorage.isLoggedIn();
  }

}
