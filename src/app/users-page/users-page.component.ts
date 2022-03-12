import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from 'src/Models/User';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faLocationArrow,faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  User:User=new User('',new Date(),'','','','','user','','',[],new Date(),'');
  email:any;
  user:any;
  locationIcon=faLocationArrow;
  iconStar=faStar;
  category:String='';
  filmIcon = faFilm;
  userIcon=faUser;
  arrowOut=faArrowAltCircleLeft;
  home=faHome;
  firstname:String='';
  lastname:String='';
  id:any;
  
public isLoggedin:boolean=false;
  constructor(
    public router:Router,
    private userService:UserService,
    private route:ActivatedRoute,
  ) { 
    
  }
  h=sessionStorage.getItem('loggedUser');
  
  ngOnInit(): void {
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
  }
