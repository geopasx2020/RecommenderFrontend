import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleLeft, faFilm, faHome, faUser,faLocationArrow,faStar, faMapPin, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.css']
})
export class UserRecommendationsComponent implements OnInit {
  private map:L.Map;
  private centroid:L.LatLngExpression=[40.63432,22.94393];
  poiId:any
  userId_00:any
  currentPoiId:any;
  pois: any[];
  filmIcon = faFilm;
  userIcon=faUser;
  arrowOut=faArrowAltCircleLeft;
  locationIcon=faLocationArrow;
  iconStar=faStar;
  home=faHome;
  mapIcon=faMap;
  geoLong:any;
  geoLat:any;
  id:any;
  lastname:String='';
  firstname:String='';
  popup = L.popup();
  userLong:any;
  userLat:any
  h=sessionStorage.getItem('loggedUser');
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
   

//   tiles.addTo(this.map);
//   var marker = L.marker([40.64688, 22.94948]).addTo(this.map);
//   var circle = L.circle([40.64688, 22.94948], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(this.map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
 }
  
 


  constructor(private router:Router,
    private userService:UserService,private httpClient: HttpClient,
    private route:ActivatedRoute) { 
      this.pois=[];
      
    }
  
  
  ngOnInit(): void {
    // this.initMap();
    if(!navigator.geolocation){
      console.log("location is not supported")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      this.userLat= position.coords.latitude
      this.userLong=position.coords.longitude
      console.log(
        position.coords.latitude,position.coords.longitude)
        ;
    });
    this.id=localStorage.getItem('userid')
    this.route.paramMap.subscribe(()=>{
      this.userId_00=this.userService.getUserId();
      const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id')
      if (hasCategoryId){
        this.currentPoiId= this.route.snapshot.paramMap.get('id');
      }
      else{
        this.currentPoiId=1;
      }

      this.userService.getRecommendationList(this.userId_00).subscribe(data=>{
        // console.log('aaaaaaaaa',this.pois);
        this.pois=data;
        console.log('aaaaaa',this.pois[3].id);
         this.poiId=this.pois[3].id
      })
    })
    this.userService.getProfileDetailsByUser(this.id).subscribe(data=>{
       this.firstname=data.firstname
       this.lastname=data.lastname
       console.log('FN:',this.firstname) 
        
        
      } )
  }
  logout(){
    this.h=null;


    localStorage.clear()

   
   sessionStorage.removeItem('loggedUser');
  
   this.router.navigate(['login']);

}

pinOnMap(geoLong,geoLat){
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
  L.marker([geoLong, geoLat]).addTo(this.map);
  L.circle([geoLong, geoLat], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 5000
}).addTo(this.map);
}
goToMap(id:any){
  this.router.navigate(['map',id])
 }



  
}




  



