import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from "./service/shared/auth.service";


@Injectable({
  providedIn: 'root'
})
export class OnlyGuestGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuthenticated = this.authService.isLoggedIn();
      if (!isAuthenticated) {
        return true;
      }
      this.router.navigateByUrl("/main");
      return false;
  }

}
