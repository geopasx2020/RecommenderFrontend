import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service'; 
 import { Todo } from 'src/Models/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  id:any
  todos: any
  message:any
  
  constructor(
    private todoService:TodoDataService,
    private route:ActivatedRoute,
    private router:Router,
  

  ) { }
 Todo:Todo= new Todo('','','',false);
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    
   // this.todos=new todo(this.id,'',false,new Date());//arxikopoiis error description
    
    if(this.id!=-1)
    {
    this.todoService.retrieveTodo('karamoua',this.id)
    .subscribe(
      data => this.todos = data
    )
    }
  }


public createTodos(){

const resp = this.todoService.createTodos(this.Todo);

  return resp.subscribe((data) => this.message = data);
  }


  saveTodo(){
    if(this.id==-1){
        //create todo
        this.todoService.createTodo('karamoua',this.todos)
        .subscribe(
          data=> {
          console.log(data)
          this.router.navigate(['todos'])    
        }
        )
    }
    else{
      this.todoService.updateTodo('karamoua',this.id,this.todos)
        .subscribe(
          data=> {
          console.log(data)
          this.router.navigate(['todos'])    
        }
        )
}
}
}
