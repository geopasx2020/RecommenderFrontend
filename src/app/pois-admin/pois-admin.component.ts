import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poi } from 'src/Models/Poi';
import { PoiCategory } from '../common/poi-category';
import { UserService } from '../service/user.service';
import { faFilm,faUser,faArrowAltCircleLeft,faHome,faPen,faPlusCircle, faPlus,faCalendar,faEnvelope,faPersonBooth,faLocationArrow } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pois-admin',
  templateUrl: './pois-admin.component.html',
  styleUrls: ['./pois-admin.component.css']
})
export class PoisAdminComponent implements OnInit {
  pois: any[];
  currentPoiId:any;
  pois2: any[];
  categoryId:any;
  pois3:Poi[]=[];
  category:any;
  categories:PoiCategory[]=[];
  categories2 = [
    {
      id: 1,
      category: 'History',
      checked: false
    },
    {
      id: 2,
      category: 'Music',
      checked: false,
    },
    {
      id: 3,
      category: 'Sports',
      checked: false,
    },
    {
      id: 4,
      category: 'Museums',
      checked: false,
    },
    {
      id: 5,
      category: 'Art',
      checked: false,
    },
    {
      id: 6,
      category: 'Bars',
      checked: false,
    },
    {
      id: 7,
      category: 'Nature',
      checked: false,
    },
    {
      id: 8,
      category: 'Gastronomy',
      checked: false,
    },
    {
      id: 9,
      category: 'Religion',
      checked: false,
    },
    {
      id: 10,
      category: 'Shopping',
      checked: false,
    },
    {
      id: 11,
      category: 'Theater',
      checked: false,
    },
    {
      id: 12,
      category: 'Gastronomy',
      checked: false,
    },
  ];
 starRating = 0; 
 pen = faPen;
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
  id:any;
  email:any;
  totalPois: any[];
  constructor(private router:Router,
    private userService:UserService,private httpClient: HttpClient,
    private route:ActivatedRoute) { 
      this.pois=[];
      this.pois2=[];
      this.pois3=[];
      this.categories=[];
      this.totalPois=[];
    }
    h=sessionStorage.getItem('loggedUser');

  ngOnInit(): void {
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
        this.firstname=data.firstname
        this.lastname=data.lastname
        this.email=data.email
      
          
           
      
        })
  }
  Search(){
    console.log("frgegergegre",this.category)
    if(this.category!=""){
        console.log("AAAA")
    }
    else if(this.category==""){
      console.log("BBBBB")
      this.ngOnInit();
    }
    this.pois=this.pois.filter(res=>
      {
        return res.category.toLocaleLowerCase.match(this.category.toLocaleLowerCase());
      })
  }
 
  logout(){
    this.h="";
    
      localStorage.clear()
      sessionStorage.setItem('loggedUser', this.h);
     
      this.router.navigate(['login']);
    } 

    changeCheckbox(event, category) {
      this.pois=this.totalPois
      console.log(this.categories2)
      if (event.target.checked==true){
        for(var i = 0; i < this.categories2.length; i++){
          if (category!=this.categories2[i].category){
            this.categories2[i].checked=false
          }
        }
      }
      console.log(event.target.checked);
      console.log(category);
      
      console.log(this.categories2);
      let currentCategories: any = [];
      let currentPois: any = [];
      for (var i = 0; i < this.categories2.length; i++) {
        if (this.categories2[i].checked == true) {
          currentCategories.push(this.categories2[i].category);
        }
      }
      for (var i = 0; i < this.pois.length; i++) {
        
        if (currentCategories.includes(this.pois[i].category.description)) {
         currentPois.push(this.pois[i])
        }
      
      }
      if (currentCategories.length!=0){
        this.pois=currentPois
      }
      else{
        this.pois=this.totalPois
      }
      
    }
    addPoi(){
      this.router.navigate(['addPoi'])
    }

}
