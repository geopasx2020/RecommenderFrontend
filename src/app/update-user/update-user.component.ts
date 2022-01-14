import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/Models/User';
import { UserService } from '../service/user.service';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faPen,faPlusCircle, faPlus,faCalendar,faEnvelope,faPersonBooth,faKey,faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
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
  message:any;
  id:any;
  email:any;
  error:any;
  gender:any;
  user:any;
  User=new User('',new Date(),'','','','','user','','',[],new Date(),'');
  constructor(private  userService:UserService,
    private route:ActivatedRoute,
    private router:Router) { }
  h=sessionStorage.getItem('loggedUser');
  ngOnInit(): void {
    sessionStorage.setItem('authenticaterUser',this.email);
    this.id=this.route.snapshot.params['id'];

    // this.userService.getUserById(this.id).subscribe(data=>{
    //   this.User=data;
    // },error=>console.log(error));
    this.userService.getUserById(this.id)
    .subscribe(
      data=>this.User=data);   
      this.userService.getUserById(this.id)
      .subscribe(
        data=>this.gender=data.gender); 
      
  }
onSubmit(){
  this.userService.updateUser(this.id,this.User).subscribe(
    data=>{
   this.goToUsersList();
  }
  ,error=>{
    console.log(error);
    this.error="Email has already taken, please insert another email";

  });
  
}

goToUsersList(){
  this.router.navigate(['/users']);
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
