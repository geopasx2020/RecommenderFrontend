import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { UserService } from '../service/user.service';
import { User } from 'src/Models/User';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faArrowCircleLeft,faArrowCircleRight,faCalendar,faEnvelope,faKey} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  filmIcon = faFilm;
  userIcon=faUser;
  passwordIcon=faKey;
  emailIcon=faEnvelope;
  arrowOut=faArrowAltCircleLeft;
  home=faHome;
  dateIcon=faCalendar;
  login=faArrowCircleRight;
  arrowIn=faArrowCircleLeft;
  password:string='';
  email:string='';
  errorMessage:String='';
  invalidLogin=false
  role:string='';
  message:any;

  
  
 
  User=new User('',new Date(),'','','','','','','',[],new Date(),'');
  //Router
  //Angular.giveMeRouter
  //Dependency Injection
  isLoggedIn=false;

  constructor(private router:Router,
    private hardcodedauthenticationService:HardcodedAuthenticationService,
    private userService:UserService) { }
    h=sessionStorage.getItem('loggedUser');  
  ngOnInit(): void {
    if (
      this.h==null){
          this.router.navigate(['login']);
    
        }
        
  }

 

  
  // handleLogin(){
  //   //routing with parameter
  //   if(this.hardcodedauthenticationService.authenticate(this.username,this.password)){
  //     //Redirect to Welcome Page
  //     this.router.navigate(['welcome',this.username])
  //     this.invalidLogin=false
  //   }
  //   else{
  //     this.invalidLogin=true
  //   }
  //   // let resp = this.userService.login(this.username,this.password,this.role);
  // }
 handleLogin(){
    let resp = this.userService.login(this.email,this.password,this.role);
  
    resp.subscribe(data=>{this.message=data;
      console.log(this.message)
      localStorage.setItem('userid', this.message.id.toString());
      sessionStorage.setItem('userid', this.message.id.toString());
      if(this.role==='admin'&&this.message.length!==0){
        this.isLoggedIn=true;         
         this.router.navigate(["adminpage"])  
         
        }
         
        if(this.role==='user'&&this.message.length!==0){
          this.isLoggedIn=true; 
          
          this.router.navigate(["userpage"])
         
    }} )
    if(this.email!=null){
      this.errorMessage="invalid login, please insert your right credentials";
     
   }
  
  sessionStorage.setItem('loggedUser', this.email);
    

}
logout(){
  this.h=null;


   localStorage.clear()

  
  sessionStorage.removeItem('loggedUser');
 
  this.router.navigate(['login']);
}

}
 