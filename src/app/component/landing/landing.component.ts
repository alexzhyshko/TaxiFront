import { Component, OnInit } from '@angular/core';
import { LocalizationService } from "../../localization/localization.service";
import { UserService } from "../../service/user/user.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  userService: UserService;
  constructor(userService: UserService, private localizationService: LocalizationService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    if (this.userService.getLocale() == null) {
      this.userService.setLocale('EN');
    }
  }

  getLocalizedSlogan() {
    return this.localizationService.getLocalizedSlogan();
  }

  getLocalizedContactMe() {
    return this.localizationService.getLocalizedContactMe();
  }

}
