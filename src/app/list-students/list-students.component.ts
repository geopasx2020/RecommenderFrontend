import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class student{
  constructor(
    // public id:number,
    // public description:string,
    // public done:boolean,
    // public targetDate:Date
  )
  {

  }
}
@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  message:any
  students: student[]
  constructor(
    private todoService:TodoDataService,

    private router:Router
  ) {
    this.students=[];
    this.Student=[];
   }

   Student:any=[];

  ngOnInit(): void {
    let resp=this.todoService.getStudents();
      resp.subscribe(data=>this.Student=data);
  }

  getStudents(){
    let resp=this.todoService.getTodos();
      resp.subscribe(data=>this.Student=data);
      // this.g=!this.g;
  }

  addStudent(){
    this.router.navigate(['students',-1])
  }

}
