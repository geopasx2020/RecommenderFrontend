import { Component, OnInit } from '@angular/core';
import { authenticationService } from '../service/authentication-user.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';





@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
   
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
     sessionStorage.setItem('authenticaterUser',this.email);
    // //   //console.log('after ',this.isUserLoggedIn());
    // //   // this.loggedIn.next(true);
    // //   // this.router.navigate(['welcome/:email']);
    
    
    //   if (this.h===null){
    //     this.isLoggedin=false;
    //   }
    //   else{
    //     this.isLoggedin=true;
    //   }
  }

  logout(){
    this.h=null;

  
     localStorage.clear()

    
    sessionStorage.setItem('loggedUser','');
   
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
