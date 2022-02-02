import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user/user.service";
import { OrderService } from "../../service/order/order.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationService } from "../../localization/localization.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  pages = [];
  userService: UserService;
  orderService: OrderService;
  orders=[];
  loading = true;

  constructor(userService: UserService, orderService: OrderService, private toastr: ToastrService, private router: Router, private localizationService: LocalizationService) {
    this.userService = userService;
    this.orderService = orderService;
  }

  ngOnInit(): void {
    if(this.userService.getActivePage()==null){
      this.userService.setPage(0);
    }
    this.orderService.getAllOrdersByUserId().subscribe(data=>{
      this.orders = data.orders;
      this.pages = Array(data.numberOfPages).fill(1).map((x,i)=>i);
      this.loading = false;
    },err=>{
      console.log(err);

        this.toastr.error(err);
    });
  }

  finishOrder(orderid: number){
    this.orderService.finishOrder(orderid).subscribe(data=>{
      this.toastr.success(data.text);
      this.ngOnInit();
    }, err=>{
      if(err.status>=200&&err.status<300){
        this.toastr.success(err.error.text);
        this.ngOnInit();
      }else if(err.status===500){
        this.toastr.error(err.error);
      }
    });
  }

  getLocalizedFinishOrder(){
    return this.localizationService.getLocalizedFinishOrder();
  }

  getLocalizedDriverArrives(){
    return this.localizationService.getLocalizedDriverArrives();
  }

  getLocalizedMinutes(){
    return this.localizationService.getLocalizedMinutes();
  }

  setPage(page: number){
    this.userService.setPage(page);
    this.loading = true;
    this.orders = [];
    this.ngOnInit();
  }

  getActivePage(){
    return this.userService.getActivePage();
  }



}
