import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';


export class todo{
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
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  message:any
  
  todos: todo[] //arxikopoiisi constructor sos
  
 
  constructor(
    private todoService:TodoDataService,

    private router:Router
  ) { 
    this.todos=[];
    this.Todo=[];
  }
  
  Todo:any=[];
  // g:boolean=false;

  ngOnInit(): void {
  //  this.refreshTodos();
  let resp=this.todoService.getTodos();
      resp.subscribe(data=>this.Todo=data);
  }
  refreshTodos(){
    this.todoService.getTodos().subscribe(
      response=>{
        console.log(response);
        this.Todo=response;
      }
    )
  }
  deleteTodo(id:any){
    console.log(`delete todo ${id}`)
    this.todoService.deleteTodo('karamoua',id).subscribe(
      response=>{
        console.log(response);
        this.message=`Delete of Todo ${id}  Successful`;
        this.refreshTodos();
      }
    )
  }
  updateTodo(id:any){
    console.log(`update todo ${id}`)
    this.router.navigate(['todos',id])   
  }

  addTodo(){
    this.router.navigate(['todos',-1])
  }
  getTodos(){
    let resp=this.todoService.getTodos();
      resp.subscribe(data=>this.Todo=data);
      // this.g=!this.g;
  }

  public deleteTodos(id:any){

     this.todoService.deleteTodos(id).subscribe(
      response=>{
        
        this.message=`Delete of Todo ${id} Successful`;
        this.ngOnInit();
      }
     )
      }

}
