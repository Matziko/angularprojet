import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.models';


@Injectable({
  providedIn: 'root'
})


export class TodoService {

  private apiUrl = '/api/todos';
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public todos$ = this.todosSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetchTodos(): void {
    this.http.get<Todo[]>(this.apiUrl).subscribe(todos => {
      this.todosSubject.next(todos);
    });
  }

  addTodo(todo: Todo): void {
    this.http.post<Todo>(this.apiUrl, todo).subscribe(() => {
      this.fetchTodos(); 
    });
  }

  updateTodo(todo: Todo): void {
    this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo).subscribe(() => {
      this.fetchTodos();
    });
  }

  deleteTodo(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
      this.fetchTodos();
    });
  }
}