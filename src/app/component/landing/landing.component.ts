import { Component, OnInit } from '@angular/core';
import { LocalizationService } from "../../localization/localization.service";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private localizationService: LocalizationService) { }

  ngOnInit(): void {
  }

  getLocalizedSlogan(){
    return this.localizationService.getLocalizedSlogan();
  }

  getLocalizedContactMe(){
    return this.localizationService.getLocalizedContactMe();
  }

}
