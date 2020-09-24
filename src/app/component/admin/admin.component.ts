import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user/user.service";
import { OrderService } from "../../service/order/order.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationService } from "../../localization/localization.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  pages = [];
  userService: UserService;
  orderService: OrderService;
  orders = [];
  loading = true;

  constructor(userService: UserService, orderService: OrderService, private toastr: ToastrService, private router: Router, private localizationService: LocalizationService) { }

  ngOnInit(): void {
    if(this.userService.getActiveAdminPage()==null){
      this.userService.setAdminPage(0);
    }
    this.orderService.getAllOrders().subscribe(data=>{
      this.orders = data.orders;
      this.pages = Array(data.numberOfPages).fill(1).map((x,i)=>i);
      this.loading = false;
    });
  }

  setAdminPage(page: number){
    this.userService.setPage(page);
    this.loading = true;
    this.orders = [];
    this.ngOnInit();
  }

  getActiveAdminPage(){
    return this.userService.getActivePage();
  }

  finishOrder(orderid: number){
    this.orderService.finishOrder(orderid).subscribe(data=>{}, err=>{
      this.ngOnInit();
    });
  }

}
