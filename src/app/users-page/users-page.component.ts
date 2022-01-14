import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  User:User=new User('',new Date(),'','','','','user','','',[],new Date(),'');
  email:any;
  user:any;
  
public isLoggedin:boolean=false;
  constructor(
    public router:Router
  ) { 
    
  }
  h=sessionStorage.getItem('loggedUser');
  
  ngOnInit(): void {
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
  }
