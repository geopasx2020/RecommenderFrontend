import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from 'src/Models/User';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faPen,faPlusCircle, faPlus,faCalendar,faEnvelope,faPersonBooth,faKey,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
//git test
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  pen = faPen;
  pwordIcon=faKey;
  userIcon=faUser;
  dateIcon=faCalendar;
  arrowOut=faArrowAltCircleLeft;
  home=faHome;
  plus=faPlus;
  emailIcon=faEnvelope;
  genderIcon=faPersonBooth;
  submitIcon=faPaperPlane;
  message:any
  users: User[]
  constructor(
    private  userService:UserService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.users=[];
    this.User=[]; 
   }
   h=sessionStorage.getItem('loggedUser');
   User:any
  ngOnInit(): void {
  }
  logout(){
    this.h="";
    
      localStorage.clear()
      sessionStorage.setItem('loggedUser', this.h);
     
      this.router.navigate(['login']);
    } 
}
