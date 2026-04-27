import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.models';
import { TodoService } from '../../services/todo.service';
import { TodoListLogicService } from '../../services/todo_component.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo_component.html',
  styleUrls: ['./todo_component.scss'],
  imports: [CommonModule]
})


export class TodoComponent implements OnInit {
  sortedData: Todo[] = [];
  displayedColumns: string[] = ['task', 'status', 'priority', 'dateCreated', 'actions'];
  sort = { active: '', direction: '' as 'asc' | 'desc' | '' };

private currentTodos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef,
    private todoListLogicService: TodoListLogicService
  ) { }

  ngOnInit() {
    this.todoService.todos$.subscribe((todos: Todo[]) => {
      this.currentTodos = [...todos];
      this.sortedData = this.todoListLogicService.sortData(this.currentTodos, this.sort.active, this.sort.direction);
      this.cdr.detectChanges();
    });
    this.todoService.fetchTodos();
  }

  toggleTodo(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(updatedTodo);
  }

  deleteTodo(todo: Todo) {
    if (todo.id) {
      this.todoService.deleteTodo(todo.id);
    }
  }

  sortBy(column: string) {
    if (this.sort.active === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.active = column;
      this.sort.direction = 'asc';
    }
    this.sortedData = this.todoListLogicService.sortData(this.currentTodos, this.sort.active, this.sort.direction);
  }

  sortData() {
    if (!this.sort.active || this.sort.direction === '') return;

    const isAsc = this.sort.direction === 'asc';

    const columnMap: Record<string, keyof Todo> = {
      'task': 'task',
      'status': 'completed',
      'priority': 'priority',
      'dateCreated': 'createAt'
    };

    const property = columnMap[this.sort.active];

    this.sortedData.sort((a, b) => {
      const valA = a[property];
      const valB = b[property];

      if (valA == null && valB == null) return 0;
      if (valA == null) return isAsc ? -1 : 1;
      if (valB == null) return isAsc ? 1 : -1;

      const comparison = valA < valB ? -1 : valA > valB ? 1 : 0;
      return isAsc ? comparison : -comparison;

    });
  }
}