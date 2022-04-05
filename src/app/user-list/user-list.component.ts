import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { UserService } from '../service/user.service';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faPen,faPlusCircle,faMale,faFemale, faPlus,faCalendar,faEnvelope,faPersonBooth,faLocationArrow } from '@fortawesome/free-solid-svg-icons';

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
  locationIcon=faLocationArrow
  firstname:String='';
  lastname:String='';
  id:any;
  email:any;
  maleIcon=faMale;
  femaleIcon=faFemale;
  gender:any;
  isMan:any;
  picture: any;
 
  
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
      
      sessionStorage.setItem('authenticaterUser',this.email);
        this.id=localStorage.getItem('userid')
        this.userService.getProfileDetailsByUser(this.id).subscribe(data=>{
        this.firstname=data.firstname
        this.lastname=data.lastname
        this.email=data.email
        this.gender=data.gender
        if (this.gender="male"){
          this.isMan=true
        }
        else{
          this.isMan=false
        }
      
          
           
      
        })
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
