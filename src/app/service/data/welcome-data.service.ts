import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//it has to do with response
export class HelloWorldBean{
  constructor(public message:string){}
}
@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) {}

  executeHelloWorldBeanService(){
    // console.log("Execute Hello World Bean Service")
    return this.http.get<HelloWorldBean>("http://localhost:8080/hello-world-bean")
  }

  executeHelloWorldBeanServiceWithPath(name:any){
    // console.log("Execute Hello World Bean Service")
    let basicAuthHeaderString=this.createBasicAuthenticationHttpHeader();
    
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`,
    {headers});
  }

  createBasicAuthenticationHttpHeader(){
    let username='user'
    let password='4e1d88d1-1f29-4c3d-aa4d-df3428a3ebeb'
    let basicAuthHeaderString='Basic'+window.btoa(username+':'+password);
    return basicAuthHeaderString;
  }
}
//Access to XMLHttpRequest at 'http://localhost:8080/hello-world-bean' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.