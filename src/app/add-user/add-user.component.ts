import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

id:any
user:any
message:any
error:any;
registrationDate = new Date().toLocaleDateString();


  constructor(
    private  userService:UserService,
    private route:ActivatedRoute,
    private router:Router
  ) { }
  h=sessionStorage.getItem('loggedUser');
  User:User=new User('',new Date(),'','','','','user','','',[],new Date(),'');

  ngOnInit(): void {
    
  }

 
 
  onSubmit(){
    
   this.userService.createUser(this.User).subscribe((response)=>{
      
      setTimeout(() => {"this is the first message"},3000 )
   this.goToUsersList();
   },error=>{
      console.log(error);
    this.error="Email has already taken, please insert another email";
   } );   
    
  }
  
  logout(){
    this.h="";
    
      localStorage.clear()
      sessionStorage.setItem('loggedUser', this.h);
     
      this.router.navigate(['login']);
    } 

    goToUsersList(){
      this.router.navigate(['/users']);
    }
   

}