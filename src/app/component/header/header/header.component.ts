import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/shared/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../../service/user/user.service";
import { UserDTO } from "../../../dto/UserDTO";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  user: UserDTO;

  constructor(private authService: AuthService, private router: Router,
    private userService: UserService) {
    //this.router.routeReuseStrategy.shouldReuseRoute = function() {
    //  return false;
    //};
    //this.mySubscription = this.router.events.subscribe((event) => {
    //  if (event instanceof NavigationEnd) {
    //    this.ngOnInit();
    //  }
    //});
  }

  getLocale(){
    var locale = this.userService.getLocale();
    if(locale==='EN'){
      return 'GB';
    }
    console.log(locale);
    return locale;
  }

  setLocale(locale: string){
    this.userService.setLocale(locale);
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.updateUser();
  }



  updateUser() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userService.getCurrentUserByUsername().subscribe(data => {
      this.user = data;
    });
  }

  goToUserProfile(userid: string) {
    this.router.navigateByUrl("/profile/"+userid);
  }

  logout() {
    this.authService.logout();
    window.location.replace("/");
  }

}
