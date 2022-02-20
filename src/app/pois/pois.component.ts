import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poi } from 'src/Models/Poi';
import { User } from 'src/Models/User';
import { Review } from 'src/Models/Review';
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
 review:any
 userId_00:any
 postData:any;
//  starRating = 0; 
  
   

  

  constructor( private router:Router,
    private userService:UserService,private httpClient: HttpClient,
    private route:ActivatedRoute) {   //useful for accessing route parameters
      this.pois=[];
      this.pois2=[];
      this.pois3=[];
      this.categories=[];
      this.review=[];

    }
    
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.userId_00=this.userService.getUserId();
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
  onChangeRating(addingscore: any,poiId:number,userId:any){
    this.postData={
      score:addingscore,
      userId:userId
    }
    console.log("adding score",addingscore,"poiid",poiId,"userid",userId)

    console.log('userId',this.userService.getUserId())
    this.httpClient.post(`http://localhost:8080/pois/${poiId}/review`, {
      score:addingscore,userId:userId} ).subscribe(responseData=>{
        console.log('responseData:',responseData);
      });  
  
   
  }
  }



  

  
  

