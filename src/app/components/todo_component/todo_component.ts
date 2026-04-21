import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.models';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo_component.html',
  styleUrls: ['./todo_component.scss'],
  imports: [CommonModule]
})
export class TodoComponent {
  @Input() todos: Todo[] = [];
  @Output() todoUpdated = new EventEmitter();

  constructor(private todoService: TodoService) {}

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(() => {
      this.todoUpdated.emit();
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.todoUpdated.emit();
    });
  }
}