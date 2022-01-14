import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component'; //import other component
import { WelcomeDataService } from '../service/data/welcome-data.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  //decraration of variables
  message="Some welcome message"
 email=''
  welcomeMessageFromBackend:String=''
  welcomeMessageFromBackendWithParameter:String=''
  h:boolean=false;
    //ActivatedRoute
  constructor(
    private route:ActivatedRoute,
   private service:WelcomeDataService ) { }

  ngOnInit(): void {
    console.log(this.message)
    // console.log(this.route.snapshot.params['name'])
    this.email=this.route.snapshot.params['email']
if(
    sessionStorage.getItem('loggedUser')===null){
this.h=false
    }
    else{
   let  h= sessionStorage.getItem('loggedUser')
   h=null
      this.h=true
    }
  }
  getWelcomeMessageWithParameter(){
    //console.log(this.service.executeHelloWorldBeanService());
    this.service. executeHelloWorldBeanServiceWithPath(this.email).subscribe(
      response=>this.handleSuccessfulResponse(response),
      error=>this.handleErrorResponse(error)
      
      
      
    );
    //console.log('last line of get welcome message')
  }
 
   getWelcomeMessage(){
    //console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanService().subscribe(
      response=>this.handleSuccessfulResponse(response),
      error=>this.handleErrorResponse(error)
      
      
      
    );
    //console.log('last line of get welcome message')
  }
  handleErrorResponse(error: any): void {
    this.welcomeMessageFromBackend=error.error.message
    this.welcomeMessageFromBackendWithParameter=error.error.message
  }
  
  handleSuccessfulResponse (response:any){ //proxi add any
    this.welcomeMessageFromBackend=response.message
    this.welcomeMessageFromBackendWithParameter=response.message
    // console.log(this.welcomeMessageFromBackend)
    // console.log(response.message)
  }


  

}

export class Class1{

}
