import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TODO_JPA_API_URL } from 'src/app/app.constants';
import { ListTodoComponent, todo } from 'src/app/list-todo/list-todo.component';
import { Todo } from 'src/Models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllTodos(username:any){
    // console.log("Execute Hello World Bean Service")
    return this.http.get<todo[]>(`http://localhost:8080/users/${username}/todos`)
    
  }

  deleteTodo(username:any,id:any){
    return this.http.delete(`http://localhost:8080/users/${username}/todos/${id}`)
  }

  retrieveTodo(username:any,id:any){
    return this.http.get<todo>(`http://localhost:8080/users/${username}/todos/${id}`)
  }

  updateTodo(username:any,id:any,todo:any){
    return this.http.put<todo>(`http://localhost:8080/users/${username}/todos/${id}`,
    todo);
  }

  createTodo(username:any,todo:any){
    return this.http.post<todo>(`http://localhost:8080/users/${username}/todos`,
    todo);
  }
  public getTodos(){
    return this.http.get(`http://localhost:8080/users/todos`);    
  }

  public createTodos(Todo:any){
    return this.http.post(`http://localhost:8080/jpa/users/createTodo`, Todo, { responseType: 'text' as 'json'});
  }

  public deleteTodos(todoId:any){
    return this.http.delete(`http://localhost:8080/delete/${todoId}`,  { responseType: 'text'});
  }

  public getStudents(){
    return this.http.get(`http://localhost:8080/api/v1/student`);    
  }

  
}
