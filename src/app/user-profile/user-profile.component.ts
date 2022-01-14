import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/Models/User';
import { UserService } from '../service/user.service';
import { faFilm,faUser,faArrowAltCircleLeft,faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  filmIcon = faFilm;
  userIcon=faUser;
  arrowOut=faArrowAltCircleLeft;
  home=faHome;
  role: String='';
  firstname:String='';
  lastname:String='';
  emailp:String='';
  password:String='';
  dob:any;
  interestings: Array<any>=[];
  message:any;
  id:any;
  email:any;
  user:any;
  age:any;
  registrationDate:any;
  empStatus:any;
  count:number=0;
  gender:any;
  userId:any;
  selectedInteresting:any=[];
  interId:any;
  users: User[]
  User:User=new User('',new Date(),'','','','','user','','',[],new Date(),'');
  public isLoggedin:boolean=false;
  h=sessionStorage.getItem('loggedUser');
  
  constructor(
    public router:Router,
    private userService:UserService,
    private route:ActivatedRoute,
    ) { 
      this.users=[];
      // this.User=[];
    }

    // User:any[];
  ngOnInit(): void {
    sessionStorage.setItem('authenticaterUser',this.email);
    this.id=localStorage.getItem('userid')
     
    // this.userService.getProfileDetailsByUser(this.id)
    // .subscribe(
    //   data=>this.users=data);
    this.userService.getProfileDetailsByUser(this.id).subscribe(data=>{
      this.role=data.role;
      console.log('aaaaaaaaaa',data)
       this.firstname=data.firstname
       this.lastname=data.lastname
       this.email=data.email
       this.password=data.password
       this.dob=data.dob;
       this.age=data.age;
       this.registrationDate=data.regd;
       this.empStatus=data.empStatus
       this.gender=data.gender
       
      for (var i = 0; i < data.interestings.length; i++){
        this.count=i;
        console.log('bbbbb',data.interestings[i])
        this.interestings.push(data.interestings[i].description)
        
        
      }
      console.log('cccccccc',this.interestings)
    })
    

  }

  logout(){
    this.h=null;


    localStorage.clear()

   
   sessionStorage.removeItem('loggedUser');
  
   this.router.navigate(['login']);

}
onSubmit(id:any){
  

  this.router.navigate(['addinteresting'],id)
}

deleteInterestings(id:any,interId:any){
  this.userService.deleteInterestingByid(id,interId).subscribe(
    response=>{
      
      this.message=`Delete of User with id ${interId} Successful`;
      this.ngOnInit();
    }
   )
}


}


