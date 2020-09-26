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

  value: string;
  order = 'desc';
  sort = false;
  sortBy: string;
  filter = false;
  filterBy: string;
  pages = [];
  userService: UserService;
  orderService: OrderService;
  orders = [];
  loading = true;

  constructor(userService: UserService, orderService: OrderService, private toastr: ToastrService, private router: Router, private localizationService: LocalizationService) {
    this.userService = userService;
    this.orderService = orderService;
  }

  ngOnInit(): void {
    if(this.userService.getActiveAdminPage()==null){
      this.userService.setAdminPage(0);
    }
    this.orderService.getAllOrders(this.sort, this.filter, '', '', '', '').subscribe(data=>{
      this.orders = data.orders;
      this.pages = Array(data.numberOfPages).fill(1).map((x,i)=>i);
      this.loading = false;
    },err=>{
      this.loading = false;
      this.toastr.error(err.error);
    });
  }

  setOrder(order){
    this.order = order;
  }

  onKey(event: any) {
    this.value = event.target.value;
  }

  setValue(value){
    this.value = value;
  }

  setSortBy(criteria){
    this.sort = true;
    this.sortBy = criteria;
  }

  setFilterBy(filterBy){
    this.filter = true;
    this.filterBy = filterBy;
  }

  applyControls(){
    this.search();
    this.userService.setAdminPage(0);
  }

  search(){
    var sortBy = '';
    if(this.sort && this.sortBy!=null){
      sortBy = this.sortBy;
    }
    var filterBy = '';
    var value = '';
    if(this.filter && this.filterBy!=null){
      filterBy = this.filterBy;
      value = this.value;
    }
    this.loading = true;
    this.orderService.getAllOrders(this.sort, this.filter, sortBy, this.order, filterBy, value).subscribe(data=>{
      this.orders = data.orders;
      this.pages = Array(data.numberOfPages).fill(1).map((x,i)=>i);
      this.loading = false;
    },err=>{
      this.loading = false;
      this.orders = [];
      this.pages = [];
      this.toastr.error(err.error);
    });
  }

  setAdminPage(page: number){
    this.userService.setAdminPage(page);
    this.loading = true;
    this.orders = [];
    this.search();
  }

  getActiveAdminPage(){
    return this.userService.getActiveAdminPage();
  }

  finishOrder(orderid: number){
    this.orderService.finishOrder(orderid).subscribe(data=>{}, err=>{
      this.ngOnInit();
    },err=>{
      this.toastr.error(err.error);
    });
  }

  getLocalizedSortBy(){
    return this.localizationService.getLocalizedSortBy();
  }

  getLocalizedDateLabel(){
    return this.localizationService.getLocalizedDateLabel();
  }

  getLocalizedPriceLabel(){
    return this.localizationService.getLocalizedPriceLabel();
  }

  getLocalizedOrderLabel(){
    return this.localizationService.getLocalizedOrderLabel();
  }

  getLocalizedAscLabel(){
    return this.localizationService.getLocalizedAscLabel();
  }

  getLocalizedDescLabel(){
    return this.localizationService.getLocalizedDescLabel();
  }

  getLocalizedFilterLabel(){
    return this.localizationService.getLocalizedFilterLabel();
  }

  getLocalizedUserLabel(){
    return this.localizationService.getLocalizedUserLabel();
  }

  getLocalizedApplyLabel(){
        return this.localizationService.getLocalizedApplyLabel();
  }

}
