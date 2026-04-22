import { Component, OnInit } from '@angular/core';
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
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  sortedData: Todo[] = [];
  displayedColumns: string[] = ['task', 'status', 'priority', 'dateCreated', 'actions'];
  sort = { active: '', direction: '' as 'asc' | 'desc' | '' };

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.sortedData = todos.slice();
    });
  }


  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  deleteTodo(sortedData: Todo) {
    this.todoService.deleteTodo(sortedData).subscribe(() => {
      this.loadTodos();
    });
  }

  sortBy(column: string) {
    if (this.sort.active === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.active = column;
      this.sort.direction = 'asc';
    }
    this.sortData();
  }

  sortData() {
    const data = this.todos.slice();
    if (!this.sort.active || this.sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'task': return compare(a.task, b.task, isAsc);
        case 'status': return compare(a.completed, b.completed, isAsc);
        case 'priority': return compare(a.priority, b.priority, isAsc);
        case 'dateCreated': return compare(a.createAt, b.createAt, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string | boolean | Date | undefined, b: number | string | boolean | Date | undefined, isAsc: boolean) {
  if (a == null && b == null) return 0;
  if (a == null) return isAsc ? -1 : 1;
  if (b == null) return isAsc ? 1 : -1;
  const comparison = a < b ? -1 : a > b ? 1 : 0;
  return isAsc ? comparison : -comparison;
}