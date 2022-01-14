import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { User } from 'src/Models/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  id:any
  user:any
  message:any
  errors: any;
  password:string='';
  email:string='';
  errorMessage:String='';
  invalidLogin=false
  role:string='';
  error:any;
  registrationDate = new Date().toLocaleDateString();
  // new data

  
  
  User:User=new User('',new Date(),'','','','','user','','',[],new Date(),'');
   
  constructor(
    private  userService:UserService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
   
  }

  onSubmit(){
      
    this.userService.createUser(this.User).subscribe((response)=>{
      this.user=response;
        
        
   this.router.navigate(["login"]) 
   },error=>{
      console.log(error);
    this.error="Email has already taken, please insert another email";
   } );
    
    
  }

  errorHandler(error:HttpErrorResponse)
  {
    return throwError(error);
  }
  logout(){
    
  }

}
