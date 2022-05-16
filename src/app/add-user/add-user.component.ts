import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from 'src/Models/User';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faPen,faPlusCircle, faPlus,faCalendar,faEnvelope,faPersonBooth,faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { Poi } from 'src/Models/Poi';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
email:any;
id:any
user:any
message:any
error:any;
pois: any[];
currentPoiId: any;
pois2: any[];
categoryId: any;
pois3: Poi[] = [];
category: any;

totalPois: any[];
poiId: any;
categories2: any[];
registrationDate = new Date().toLocaleDateString();
userIcon=faUser;
  dateIcon=faCalendar;
  arrowOut=faArrowAltCircleLeft;
  home=faHome;
  plus=faPlus;
  emailIcon=faEnvelope;
  genderIcon=faPersonBooth;
  locationIcon=faLocationArrow;
  firstname:String='';
  lastname:String='';


  constructor(
    private  userService:UserService,
    private route:ActivatedRoute,
    private router:Router
  ) {this.pois = [];
    this.pois2 = [];
    this.pois3 = [];
   
    this.totalPois = [];
    this.categories2 = []; }
  h=sessionStorage.getItem('loggedUser');
  User:User=new User('',new Date(),'','','','','user','','',[],new Date(),'');
  Poi: Poi = new Poi('', '', '', '', '', '', '', '', '', '');
  
  ngOnInit(): void {
    console.log("first name:",this.firstname)
    this.userService.getPoisList(this.currentPoiId).subscribe((data) => {
      console.log(this.pois);
      this.pois = data;
      this.totalPois = data;
      console.log('data category:', this.pois[0].category.title);
      console.log(this.pois[0].category.id);
      this.poiId = this.pois[0].id;
      this.categoryId = this.pois[0].category.id;
      console.log('this poiID:', this.poiId);
      console.log('this categoryID gggggggggg:', this.categoryId);
    });
    this.userService.getPoisCategories().subscribe((data2) => {
      this.categories2 = data2;
      console.log('poisCategories:', this.categories2);
    });
    this.route.paramMap.subscribe(()=>{
      const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id')
      if (hasCategoryId){
        this.currentPoiId= this.route.snapshot.paramMap.get('id');
      }
      else{
        this.currentPoiId=1;
      }

      this.userService.getPoisList(this.currentPoiId).subscribe(data=>{
        console.log(this.pois);
        this.pois=data;
        this.totalPois=data;
        console.log(this.pois);
      })
    })
    if (
      this.h==null){
          this.router.navigate(['login']);
    
        }
        sessionStorage.setItem('authenticaterUser',this.email);
        this.id=localStorage.getItem('userid')
        this.userService.getProfileDetailsByUser(this.id).subscribe(data=>{
          console.log("data100000000000000000000:",data)
          console.log(data.firstname)
          this.firstname=data.firstname
          this.lastname=data.lastname
          this.email=data.email        
             
        
          })
    
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