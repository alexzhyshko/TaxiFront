import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { RefreshTokenResponse } from "./dto/response/RefreshTokenResponse";
import { AuthService } from './service/shared/auth.service';
import { StorageService } from './service/storage/storage.service';
import { catchError, switchMap, take, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(public authService: AuthService, public storageService: StorageService) { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    var newReq = req;
    if (this.storageService.getToken()) {
      newReq = this.addToken(req, this.storageService.getToken(), this.storageService.getLocale());
    }
    return next.handle(newReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse
        && (error.status === 401)) {
        return this.handleAuthErrors(newReq, next);
      } else {
        return throwError(error);
      }
    }));
  }
  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: RefreshTokenResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(refreshTokenResponse.token);
          return next.handle(this.addToken(req, refreshTokenResponse.token, this.storageService.getLocale()));
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(req, jwt, this.storageService.getLocale()));
        }));
    }
  }
  private addToken(req: HttpRequest<any>, jwtToken: string, locale: string): HttpRequest<any> {
    let headers = new HttpHeaders({ 'User_Locale': locale, 'Authorization': `Bearer ${jwtToken}`, 'Content-Type': 'application/json; charset=UTF-8' });
    var clonedRequest = req.clone();
    clonedRequest.headers = headers;
    return clonedRequest;
  }
}
