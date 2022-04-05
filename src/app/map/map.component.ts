import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { UserService } from '../service/user.service';
import { faArrowAltCircleLeft, faFilm, faHome, faUser,faLocationArrow,faStar, faMapPin, faMapMarker, faMap } from '@fortawesome/free-solid-svg-icons';
import { Poi } from 'src/Models/Poi';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map:L.Map;
  private centroid:L.LatLngExpression=[40.63432,22.94393];
  userId_00:any
  currentPoiId:any;
  pois: any[];
  poi:any[];
  filmIcon = faFilm;
  userIcon=faUser;
  arrowOut=faArrowAltCircleLeft;
  locationIcon=faLocationArrow;
  iconStar=faStar;
  home=faHome;
  mapIcon=faMap;
  geoLong:any;
  geoLat:any;
  popup = L.popup();
  h=sessionStorage.getItem('loggedUser');
  Poi:Poi=new Poi('','','','','','','','','','');
  constructor(private router:Router,
    private userService:UserService,private httpClient: HttpClient,
    private route:ActivatedRoute) { 
      this.pois=[];
      this.poi=[];
    }

  ngOnInit(): void {   
    this.route.paramMap.subscribe(()=>{
      this.userId_00=this.userService.getUserId();
      const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id')
      if (hasCategoryId){
        this.currentPoiId= this.route.snapshot.paramMap.get('id');
        console.log('poiID:',this.currentPoiId)
      }
      else{
        this.currentPoiId=1;
      }
      this.userService.getPoiByID(this.currentPoiId)
    .subscribe(
      data=>this.Poi=data); 
      console.log('aaaaaaa',this.Poi);
      this.geoLat=this.Poi.latitude;
      this.geoLong=this.Poi.longtitude;
    
    })
    this.userService.getPoiByID(this.currentPoiId).subscribe(data=>{
        this.Poi=data;
      console.log('xxxxxxxxxxxxxxxx',this.Poi)
      this.geoLat=this.Poi.latitude;
      this.geoLong=this.Poi.longtitude;
      this.initMap();
      console.log(this.geoLat)
      console.log(this.geoLong)
  })
 
}
  private initMap():void{
    this.map=L.map('map',{
      center:this.centroid,
      zoom:12
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 18,
       minZoom: 10,
       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     });   
 
   tiles.addTo(this.map);
   var marker = L.marker([this.geoLat, this.geoLong]).addTo(this.map);
   console.log('marker',marker)
   var circle = L.circle([this.geoLat, this.geoLong], {
     color: 'red',
     fillColor: '#f03',
     fillOpacity: 0.5,
     radius: 500
 }).addTo(this.map);
 marker.setLatLng([this.geoLat,this.geoLong])
 marker.bindPopup("<b>Here you are").openPopup();

  }
  logout(){
    this.h=null;


    localStorage.clear()

   
   sessionStorage.removeItem('loggedUser');
  
   this.router.navigate(['login']);

}

pinOnMap(geoLong,geoLat){
  L.marker([geoLong, geoLat]).addTo(this.map);
  L.circle([geoLong, geoLat], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(this.map);
}

}
