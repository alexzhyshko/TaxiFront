import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user/user.service";
import { OrderService } from "../../service/order/order.service";
import { LocalizationService } from "../../localization/localization.service";
import { UserDTO } from "../../dto/UserDTO";
import { OrderDTO } from "../../dto/OrderDTO";
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../../../environments/environment";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  loading = false;
  cars = [];
  variants = [];
  imgname: string;
  orderCategory: string;
  orderPassengerCount: number;
  addresses;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 50.449558;
  lng = 30.525236;
  zoom = 12;
  carMarkers = [];
  markers = [];
  user: UserDTO;
  userService: UserService;
  orderService: OrderService;
  constructor(userService: UserService, orderService: OrderService, private toastr: ToastrService, private router: Router, private localizationService: LocalizationService) {
    this.addresses = {
      departureAddress: null,
      destinationAddress: null
    };
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.userService = userService;
    this.orderService = orderService;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/alexzhyshko/ckf8d3r925e6w19pf28yujhg1',
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: this.getLocalizedGeocoderPlaceholder()
      })
    );
    this.map.on('click', (e) => {
      if (this.markers.length >= 2) {
        alert("No more markers allowed");
        return;
      }
      var lat = e.lngLat.wrap().lat;
      var lng = e.lngLat.wrap().lng;
      var lngLat = {
        lng: lng,
        lat: lat
      };
      if (this.markers.length == 0) {
        this.getAddress(lngLat.lat, lngLat.lng, this.addresses, true);
      }
      if (this.markers.length == 1) {
        this.getAddress(lngLat.lat, lngLat.lng, this.addresses, false);
      }
      var marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(this.map);
      this.markers.push(marker);
      this.loadDetails();
    });
  }


  addCarMarker(lngLat) {
    var marker = new mapboxgl.Marker({color: 'red'}).setLngLat(lngLat).addTo(this.map);
    this.carMarkers.push(marker);
  }

  ngOnInit(): void {
    this.buildMap();
    this.userService.getAllCars().subscribe(data => {
      this.cars = data;
      for(let car of this.cars){
        var lngLat = {
          lng: car.coordinates.longitude,
          lat: car.coordinates.latitude
        };
        this.addCarMarker(lngLat);
      }
    });
    this.userService.getCurrentUserByUsername().subscribe(data => {
      this.user = data;
      this.userService.setUserId(this.user.id);
    });
  }

  clearMap() {
    for (let marker of this.markers) {
      marker.remove();
    }
    this.markers = [];
    this.addresses = {
      departureAddress: null,
      destinationAddress: null
    };
    this.variants = [];
    this.orderPassengerCount = undefined;
  }

  getAddress(lat, lng, container, setDepartureAddress) {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lng + "," + lat + ".json?access_token=" + mapboxgl.accessToken;
    $.get(url, function(data) {
      if (setDepartureAddress) {
        container.departureAddress = data.features[0].place_name;
      } else {
        container.destinationAddress = data.features[0].place_name;
      }
    });
  }

  setCategory(category: string) {
    this.orderCategory = category;
  }

  setPassengerCount(count: number) {
    this.orderPassengerCount = count;
    this.imgname = 'assets/' + count + ".png";
    this.loadDetails();
  }

  loadDetails() {
    if (this.orderPassengerCount !== undefined && this.markers.length == 2) {
      this.loading = true;
      var departureLng = this.markers[0]._lngLat.lng;
      var departureLat = this.markers[0]._lngLat.lat;
      var destinationLng = this.markers[1]._lngLat.lng;
      var destinationLat = this.markers[1]._lngLat.lat;
      var places = this.orderPassengerCount;
      this.orderService.getOrderDetails(departureLng, departureLat, destinationLng, destinationLat, places).subscribe((data) => {
        this.variants = data;
        this.loading = false;
      });
    }
  }

  orderRegular(category: string) {
    if (this.orderPassengerCount === undefined) {
      this.toastr.info("Please specify passenger count");
      return;
    }
    else if (this.markers.length < 2) {
      this.toastr.info("Please specify departure and destination points");
      return;
    }
    var departureLng = this.markers[0]._lngLat.lng;
    var departureLat = this.markers[0]._lngLat.lat;
    var destinationLng = this.markers[1]._lngLat.lng;
    var destinationLat = this.markers[1]._lngLat.lat;
    var places = this.orderPassengerCount;
    this.userService.order(departureLng, departureLat, destinationLng, destinationLat, category, places, false, false).subscribe((data) => {
      this.toastr.success(this.localizationService.getLocalizedDriverArrives()+" "+data.timeToArrival+" "+this.localizationService.getLocalizedMinutes()+"\n"+data.driver.name+", "+data.car.manufacturer+" "+data.car.model+", "+data.car.plate+"\n"+data.price+"₴");
      this.router.navigateByUrl("orders");
      this.userService.setPage(0);
    }, (err) => {
      this.toastr.error(err.error.text);
    });
  }

  getLocalizedDestination(){
    return this.localizationService.getLocalizedDestination();
  }

  getLocalizedDeparture(){
    return this.localizationService.getLocalizedDeparture();
  }

  getLocalizedClear(){
    return this.localizationService.getLocalizedClear();
  }

  getLocalizedPassengerCount(){
    return this.localizationService.getLocalizedPassengerCount();
  }

  getLocalizedPickPoint(){
    return this.localizationService.getLocalizedPickPoint();
  }

  getLocalizedMin(){
    return this.localizationService.getLocalizedMin();
  }

  getLocalizedGeocoderPlaceholder(){
    return this.localizationService.getLocalizedGeocoderPlaceholder();
  }

}
