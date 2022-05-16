import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/Models/User';
import { isIdentifierOrPrivateIdentifier } from 'typescript';

@Component({
  selector: 'app-add-interestings',
  templateUrl: './add-interestings.component.html',
  styleUrls: ['./add-interestings.component.css']
})


export class AddInterestingsComponent implements OnInit {
  interArrIdUser:any=[]
  selectedInteresting:any=[];
  interArr:any=[]
  interId:any;
  userId:any;
  message:any;
  user:any;
  email:any;
  id:any
  User:User=new User('',new Date(),'','','','','user','','',[],new Date(),'');
 
  constructor(private http: HttpClient,
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router ) {
    }
  h=sessionStorage.getItem('loggedUser');

  ngOnInit(): void {
    sessionStorage.setItem('authenticaterUser',this.email);
    this.id=this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data=>{
      this.User=data;
    },error=>console.log(error));
 
    this.http.get<any>(`http://localhost:8080/api/v1/user/interestings`, {
      })
    .subscribe((data) => {
      console.log('data',data)
      this.interArr=data
    })

    this.userService.getProfileDetailsByUser(localStorage.getItem('userid')).subscribe(data=>{
      for (let i = 0; i < data.interestings.length; i++) {
        this.interArrIdUser.push(data.interestings[i].id)
        this.selectedInteresting.push(data.interestings[i].id.toString())
      }
      console.log('interArrIdUser',this.interArrIdUser)
  })}

  interestingChange(event:any){
    let index=this.selectedInteresting.indexOf(event.target.value)
    if (index==-1){
    this.selectedInteresting.push(event.target.value);
    }
    else{
      this.selectedInteresting.splice(index,1);
    }
    console.log('selectedInteresting',this.selectedInteresting)
  }

  logout(){
    this.h=null;


    localStorage.clear()

   
   sessionStorage.removeItem('loggedUser');
  
   this.router.navigate(['login']);

}

  onSubmit(){
    this.userService.getProfileDetailsByUser(localStorage.getItem('userid')).subscribe(data=>{
      console.log('userID: ',localStorage.getItem('userid'))
      this.userId=localStorage.getItem('userid')
      for (let i = 0; i <= this.selectedInteresting.length; i++) {        
        this.interId=this.selectedInteresting[i]
        this.userService.createInterestingByUser(this.userId,this.interId,this.User)     
          }
     
  })
  this.router.navigate(['userprofile']);
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
    selectChangeHandler (event: any) {
      this.interId = event.target.value;
  
    }

    saveInteresting(){
      this.userId=localStorage.getItem('userid')
      console.log('thisssssssssssssssssssss',this.userId)
      console.log('thisssssssssssssssssssss',this.interId)

      this.userService.createInterestingByUser(this.userId,this.interId,this.User).subscribe(
        data=>{this.router.navigate(["userprofile"])}         
           );
    }

    deleteInteresting(){
      this.userId=localStorage.getItem('userid')
      console.log('thisssssssssssssssssssss',this.userId)
      console.log('thisssssssssssssssssssss',this.interId)

      this.userService.deleteInterestingByid(this.userId,this.interId).subscribe(
        data=>{this.router.navigate(["userprofile"])}         
           );
    }



      
}
