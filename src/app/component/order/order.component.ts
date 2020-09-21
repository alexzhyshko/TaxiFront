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
  orders=[];

  constructor(userService: UserService, orderService: OrderService, private toastr: ToastrService, private router: Router) {
    this.userService = userService;
    this.orderService = orderService;
  }

  ngOnInit(): void {
    this.orderService.getAllOrdersByUserId().subscribe(data=>{
      console.log(data);

      this.orders = data;
    });
  }

  finishOrder(orderid: number){
    this.orderService.finishOrder(orderid).subscribe(data=>{}, err=>{
      this.ngOnInit();
    });
  }

}
