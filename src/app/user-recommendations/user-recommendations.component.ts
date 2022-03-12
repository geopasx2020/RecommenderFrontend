import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowAltCircleLeft, faFilm, faHome, faUser,faLocationArrow,faStar } from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.css']
})
export class UserRecommendationsComponent implements OnInit {
  userId_00:any
  currentPoiId:any;
  pois: any[];
  filmIcon = faFilm;
  userIcon=faUser;
  arrowOut=faArrowAltCircleLeft;
  locationIcon=faLocationArrow;
  iconStar=faStar;
  home=faHome;
  h=sessionStorage.getItem('loggedUser');
  constructor(private router:Router,
    private userService:UserService,private httpClient: HttpClient,
    private route:ActivatedRoute) { 
      this.pois=[];
    }

  ngOnInit(): void {
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
        console.log(this.pois);
        this.pois=data;
        console.log('pois',this.pois);
      })
    })
  }
  logout(){
    this.h=null;


    localStorage.clear()

   
   sessionStorage.removeItem('loggedUser');
  
   this.router.navigate(['login']);

}

}
