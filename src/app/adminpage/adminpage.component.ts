import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faLocationArrow,faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  locationIcon=faLocationArrow;
  iconStar=faStar;
  category:String='';
  filmIcon = faFilm;
  userIcon=faUser;
  arrowOut=faArrowAltCircleLeft;
  home=faHome;
  User:User=new User('',new Date(),'','','','','user','','',[],new Date(),'');
  email:any;
  user:any;
  
public isLoggedin:boolean=false;

 constructor(
   public hardcodedAuthenticationService:HardcodedAuthenticationService,
   
   public router:Router) { 

     }
 h=sessionStorage.getItem('loggedUser');   
 ngOnInit(): void {   

   //  this.h=sessionStorage.getItem('loggedUser');
   if (
  this.h==null){
      this.router.navigate(['login']);

    }
 
 }

 logout(){
   this.h=null;


    localStorage.clear()

   
   sessionStorage.removeItem('loggedUser');
  
   this.router.navigate(['login']);
 }
 public isLoggedIn(): boolean {      
   let status = false;      
   if (localStorage.getItem('isLoggedIn') == "true") {      
      status = true;      
   }
     else {      
      status = false;      
      }      
   return status;      
   }

}
