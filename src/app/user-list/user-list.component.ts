import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { UserService } from '../service/user.service';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faPen,faPlusCircle, faPlus,faCalendar,faEnvelope,faPersonBooth } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  pen = faPen;
  userIcon=faUser;
  dateIcon=faCalendar;
  arrowOut=faArrowAltCircleLeft;
  home=faHome;
  plus=faPlus;
  emailIcon=faEnvelope;
  genderIcon=faPersonBooth
  
  message:any
 users: User[]
  constructor(
    private router:Router,
    private userService:UserService
  ) {
    this.users=[];
    this.User=[];
    
   }
   h=sessionStorage.getItem('loggedUser');
   
   User:any[];
  ngOnInit(): void {
    
    this.userService.getUsersList().subscribe(data=>{
      this.users=data;
    })
    if( this.h==='georgekaramousalidis@gmail.com'){
      this.router.navigate(['/users']) }
      
      else{
        this.router.navigate(['/login'])
      }
      
    console.log( this.h)
  
   



    
  }

  private getUsers(){
    
    this.userService.getUsersList().subscribe(data=>{
      this.users=data;
      
    })
  }
  public deleteUsers(id:any){

    this.userService.deleteUsers(id).subscribe(
     response=>{
       
       this.message=`Delete of User with id ${id} Successful`;
       this.ngOnInit();
     }
    )
     }

     addUser(){
      this.router.navigate(['users',-1])
    }
    updateUser(id:any){
     this.router.navigate(['update-user',id])
    }
    logout(){
      this.h="";
      
        localStorage.clear()
        sessionStorage.setItem('loggedUser', this.h);
       
        this.router.navigate(['login']);
      } 

   

    

}
