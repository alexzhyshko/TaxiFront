import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user/user.service";
import { OrderService } from "../../service/order/order.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  userService: UserService;
  orderService: OrderService;
  data=[];

  constructor(userService: UserService, orderService: OrderService, private toastr: ToastrService, private router: Router) {
    this.userService = userService;
    this.orderService = orderService;
  }

  ngOnInit(): void {
    this.orderService.getActiveOrdersByUserId().subscribe(data=>{
      this.data = data;
    });
  }

}
