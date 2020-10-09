import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from "./service/user/user.service";
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  isAdmin = false;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | Promise<boolean> {
    this.isAdmin = (await this.userService.getCurrentUserPromiseByUsername()).role === "ADMIN";
    if (this.isAdmin === true) {
      this.toastr.info("Hi, admin");
      return Promise.resolve(true);
    }
    this.router.navigateByUrl("/main");
    this.toastr.error("Forbidden");
    return Promise.resolve(false);
  }

}
