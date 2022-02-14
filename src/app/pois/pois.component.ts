import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poi } from 'src/Models/Poi';
import { PoiCategory } from '../common/poi-category';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-pois',
  templateUrl: './pois.component.html',
  styleUrls: ['./pois.component.css']
})
export class PoisComponent implements OnInit {
  pois: any[];
  currentPoiId:any;
  pois2: any[];
  categoryId:any;
  pois3:Poi[]=[];
  category:any;
 categories:PoiCategory[]=[];
 starRating = 0; 
  
   

  

  constructor( private router:Router,
    private userService:UserService,private httpClient: HttpClient,
    private route:ActivatedRoute) {   //useful for accessing route parameters
      this.pois=[];
      this.pois2=[];
      this.pois3=[];
      this.categories=[];
    }
    
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
        console.log(this.pois);
      })
    })
    
  }
  Search(){
    if(this.category!=""){

    }
    else if(this.category==""){
      this.ngOnInit();
    }
    this.pois=this.pois.filter(res=>
      {
        return res.category.toLocaleLowerCase().match(this.category.toLocaleLowerCase());
      })
  }
  onSubmit(){
    this.httpClient.get<PoiCategory[]>(`http://localhost:8080/category/allcategories`).subscribe(data=>{
    this.categories=data;})
  }
  }



  

  
  

