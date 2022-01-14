import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authenticationService {
 message:any;
 email:any
 password:any
 role:any
 isLoggedIn=false;
 invalidLogin=false;
 isAdmin=false;
  errorMessage='';
  constructor(
    private userService:UserService,
    private router:Router
  ) { }
 
  authenticate(){
  
   let resp = this.userService.login(this.email,this.password,this.role);
  
    resp.subscribe(data=>{this.message=data;
  
     if(this.role==='admin'&&this.message.length!==0){
         this.isLoggedIn=true;     
         this.router.navigate(["/adminpage"])       
    }
         
        if(this.role==='user'&&this.message.length!==0){
          this.isLoggedIn=true;
          this.router.navigate(["/"])
         
    }} )
    if(this.email!=null){
      this.isLoggedIn=true;
      this.errorMessage="invalid login";
     
   }
  
    sessionStorage.setItem('loggedUser', this.email);
  
}
}