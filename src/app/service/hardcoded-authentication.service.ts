import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/Models/User';
import { LogoutComponent } from '../logout/logout.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  User:User=new User('',new Date(),'','','','','user','','',[],new Date(),'');
  email:any;
  password:any;
  role:any;
  message:any;
  errorMessage:any
  isLoggedIn=true;
  


  constructor(
    private router: Router,
    private userService:UserService,
    private http:HttpClientModule
  ) {}

  login(user: User) {
    //console.log('before ',this.isUserLoggedIn());
    if (user.email !== '' && user.password !== '' ) {
       sessionStorage.setItem('authenticaterUser',this.email);
      //console.log('after ',this.isUserLoggedIn());
      this.loggedIn.next(true);
      this.router.navigate(['admin']);
    }
   
  }
 

  isUserLoggedIn(){
    let resp = this.userService.login(this.email,this.password,this.role);
  
    resp.subscribe(data=>{this.message=data;
  
      if(this.role==='admin'&&this.message.length!==0){
        
        this.isLoggedIn=true;     
        this.router.navigate(["adminpage"])  
          
         
        }
         
        if(this.role==='user'&&this.message.length!==0){
          
          this.isLoggedIn=true; 
          this.router.navigate(["/"])
        
         
    }} )
   
   return this.isLoggedIn
  
  }

  // logout() {
  //   this.loggedIn.next(false);
  //   this.router.navigate(['/login']);
  // }
//   message:any;
//   email:any
//   password:any
//   role:any
//   isUserLoggedIn=false;
//   invalidLogin=false;
//   isAdmin=false;
//    errorMessage='';
//    constructor(
//     private userService:UserService,
//     private router:Router
//   ) { }

//   authenticate(email:any,password:any,role:any){
//     let resp = this.userService.login(this.email,this.password,this.role);
   
//      resp.subscribe(data=>{this.message=data;
   
//       if(this.role==='admin'&&this.message.length!==0){
//           return true;    
//           this.router.navigate(["/adminpage"])       
//      }
          
//       else if(this.role==='user'&&this.message.length!==0){
//            return true;
//            this.router.navigate(["/"])
          
//      }
//     else if (this.email!=null){
//       this.errorMessage="invalid login";
//       return true
//     }
//   else return false } )
    
  
   
//  }

//  logout(){
//      sessionStorage.setItem('loggedUser', this.email);
//  }

  // constructor() { }
 
  // authenticate(username: string,password: string){
  //   // console.log('before'+this.isUserLoggedIn)
  //   if(username==='karamoua' && password==='paok1926'){
  //     sessionStorage.setItem('authenticaterUser',username)
  //     // console.log('after'+this.isUserLoggedIn)
  //     return true
  //   }
  //   {
  //     return false
  //   }
  // }
  // isUserLoggedIn(){
  //   let user = sessionStorage.getItem('authenticaterUser')
  //   return !(user ===null)
  // }

  logout(){
    sessionStorage.removeItem('authenticaterUser')
    this.router.navigate(['/login']);
  }
}

