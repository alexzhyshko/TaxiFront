import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user/user.service";
import { UserDTO } from "../../dto/UserDTO";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserDTO;
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
   }

  ngOnInit(): void {
    this.userService.getCurrentUserByUsername().subscribe(data => {
      console.log("adadadad");

      this.user = data;
    });;
  }

}
