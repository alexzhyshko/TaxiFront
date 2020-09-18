import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { RefreshTokenResponse } from "./dto/response/RefreshTokenResponse";
import { AuthService } from './service/shared/auth.service';
import { StorageService } from './service/storage/storage.service';
import { catchError, switchMap } from 'rxjs/operators';


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
      newReq = this.addToken(req, this.storageService.getToken(), "EN");
    }
    return next.handle(newReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse
        && (error.status === 403)) {
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
          return next.handle(this.addToken(req, refreshTokenResponse.token, "EN"));
        })
      )
    }
  }
  private addToken(req: HttpRequest<any>, jwtToken: string, locale: string): HttpRequest<any> {
    const clonedRequest = req.clone({
      setHeaders: {
        User_Locale: locale,
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return clonedRequest;
  }
}
