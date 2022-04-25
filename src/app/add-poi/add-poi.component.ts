import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Poi } from 'src/Models/Poi';
import { PoiCategory } from '../common/poi-category';

@Component({
  selector: 'app-add-poi',
  templateUrl: './add-poi.component.html',
  styleUrls: ['./add-poi.component.css']
})
export class AddPoiComponent implements OnInit {
  id:any
  user:any
  message:any
  error:any;
  pois: any[];
  currentPoiId:any;
  pois2: any[];
  categoryId:any;
  pois3:Poi[]=[];
  category:any;
  categories:PoiCategory[]=[];
  totalPois: any[];
  poiId:any;
  
  constructor(
    private  userService:UserService,
    private route:ActivatedRoute,
    private router:Router
  ) { 
    this.pois=[];
      this.pois2=[];
      this.pois3=[];
      this.categories=[];
      this.totalPois=[];
  }
  Poi:Poi=new Poi('','','','','','','','','','');
  h=sessionStorage.getItem('loggedUser');
  ngOnInit(): void {
    this.userService.getPoisList(this.currentPoiId).subscribe(data=>{
      console.log(this.pois);
      this.pois=data;
      this.totalPois=data;
      console.log(this.pois[0].category.id);
      this.poiId=this.pois[0].id;
      this.categoryId=this.pois[0].category.id
      console.log("this poiID:",this.poiId)
      console.log("this categoryID:",this.categoryId)
    })
  }
  onSubmit(){
   this.userService.createPoi(this.Poi,this.poiId,this.categoryId).subscribe((response)=>{
      
  this.goToPoisList();
      
   } ); 
    
     
   }
   logout(){
    this.h="";   
    localStorage.clear()
    sessionStorage.setItem('loggedUser', this.h);     
    this.router.navigate(['login']);
    } 
    goToPoisList(){
      this.router.navigate(['/adminviewpois']);
    }

}
