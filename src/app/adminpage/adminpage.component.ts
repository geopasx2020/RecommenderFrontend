import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faLocationArrow,faStar,faMale,faFemale } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../service/user.service';
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
  firstname:String='';
  lastname:String='';
  id:any;
  maleIcon=faMale;
  femaleIcon=faFemale;
  
  
public isLoggedin:boolean=false;

 constructor(
   public hardcodedAuthenticationService:HardcodedAuthenticationService,
   private userService:UserService,
   
   public router:Router) { 

     }
 h=sessionStorage.getItem('loggedUser');   
 ngOnInit(): void {   

   //  this.h=sessionStorage.getItem('loggedUser');
   if (
  this.h==null){
      this.router.navigate(['login']);

    }
    sessionStorage.setItem('authenticaterUser',this.email);
        this.id=localStorage.getItem('userid')
        this.userService.getProfileDetailsByUser(this.id).subscribe(data=>{
        this.firstname=data.firstname
        this.lastname=data.lastname
        this.email=data.email
      
          
           
      
        })
 
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
