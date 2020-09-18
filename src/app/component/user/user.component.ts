import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user/user.service";
import { UserDTO } from "../../dto/UserDTO";
import { OrderDTO } from "../../dto/OrderDTO";
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../../../environments/environment";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  order: OrderDTO;
  orderCategory: string;
  orderPassengerCount: number;
  addresses;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 50.449558;
  lng = 30.525236;
  zoom = 12;
  markers = [];
  user: UserDTO;
  userService: UserService;
  constructor(userService: UserService, private toastr: ToastrService) {
    this.addresses={
      departureAddress: null,
      destinationAddress: null
    };
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.userService = userService;
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
        mapboxgl: mapboxgl
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
    });
  }

  ngOnInit(): void {
    this.buildMap();
    this.userService.getCurrentUserByUsername().subscribe(data => {
      console.log("adadadad");
      this.user = data;
    });;
  }

  clearMap() {
    for (let marker of this.markers) {
      marker.remove();
    }
    this.markers = [];
    this.addresses={
      departureAddress: null,
      destinationAddress: null
    };
  }

  getAddress(lat, lng, container, setDepartureAddress){
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lng + "," + lat + ".json?access_token=" + mapboxgl.accessToken;
    $.get(url, function(data){
        if(setDepartureAddress){
          container.departureAddress = data.features[0].place_name;
        }else{
          container.destinationAddress = data.features[0].place_name;
        }
    });
  }

  setCategory(category: string){
    this.orderCategory = category;
  }

  setPassengerCount(count: number){
    this.orderPassengerCount = count;
  }

  orderRegular(){
    if(this.orderCategory===undefined){
      this.toastr.info("Please specify car category");
      return;
    }
    else if(this.orderPassengerCount===undefined){
      this.toastr.info("Please specify passenger count");
      return;
    }
    else if(this.markers.length<2){
      this.toastr.info("Please specify departure and destination points");
      return;
    }
    var departureLng = this.markers[0]._lngLat.lng;
    var departureLat = this.markers[0]._lngLat.lat;
    var destinationLng = this.markers[1]._lngLat.lng;
    var destinationLat = this.markers[1]._lngLat.lat;
    var category = this.orderCategory;
    var places = this.orderPassengerCount;
    this.userService.order(departureLng, departureLat, destinationLng, destinationLat, category, places, false, false).subscribe((data)=>{
      console.log(data);
      this.order = data;
    }, (err)=>{
      this.toastr.error(err.error.text);
    });
  }
}
