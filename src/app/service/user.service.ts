import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/Models/User';
import { Poi } from 'src/Models/Poi';
import { Interesting } from 'src/Models/Interesting';
import {catchError, map} from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class UserService {
  User:User=new User('',new Date(),'','','','','user','','',[],new Date(),'');
  Poi:Poi=new Poi('','','','','','','','');
  constructor(private httpClient :HttpClient) { 

  }
  getUsersList():Observable<User[]>{
    return this.httpClient.get<User[]>(`http://localhost:8080/api/v1/user`);
  }

  getPoisList(theCategoryId:number):Observable<Poi[]>{
    
    return this.httpClient.get<Poi[]>(`http://localhost:8080/pois`);
  }


  

  public deleteUsers(userId:any){
    return this.httpClient.delete(`http://localhost:8080/api/v1/user/${userId}`,  { responseType: 'text'});
  }

  createUser(user:User):Observable<Object>{
    return this.httpClient.post(`http://localhost:8080/api/v1/user`,user );

  }
  createPoi(poi:Poi):Observable<Object>{
    return this.httpClient.post(`http://localhost:8080/pois/save`,poi );

  }

  updateUser(userId: any,user:User): Observable<Object> {
    return this.httpClient.put(`http://localhost:8080/api/v1/user/updateUser`,user);
  }

  getUserById(userId:number):Observable<User>{
      return this.httpClient.get<User>(`http://localhost:8080/api/v1/user/users/${userId}`);
  }

  public login(email:any, password:any,role:any){
    

    return this.httpClient.get( `http://localhost:8080/api/v1/user/User/${email}/${password}/${role}`);
    
  }

  getProfileDetailsByUser(userId:any):Observable<User>{
    console.log(userId)
    return this.httpClient.get<User>(`http://localhost:8080/api/v1/user/users/interestings/${userId}`);
  }

  createInterestingByUser(userId:any,interId:any,user:User) :Observable<Object>{
   
    return this.httpClient.put(`http://localhost:8080/api/v1/user/${userId}/interestings/${interId}`,user)
  }
   deleteInterestingByid(userId:any,interId:any) :Observable<Object> {
    return this.httpClient.delete(`http://localhost:8080/api/v1/user/${userId}/interestings/${interId}`)
  }

  getInterestingsByUser(userId:any):Observable<User>{
    return this.httpClient.get<User>(`http://localhost:8080/api/v1/user/users/interestings/${userId}`);
  }

  getPoiByCategory(categoryId:any):Observable<Poi>{
    return this.httpClient.get<Poi>(`http://localhost:8080/category/categories/${categoryId}/pois`)
  }
  


  

  
  
}
