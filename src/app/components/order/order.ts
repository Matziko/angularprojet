import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.models';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.html',
  styleUrls: ['./order.scss'],
  imports: [CommonModule]
})
export class OrderComponent {
  @Input() todos: Todo[] = [];
  @Output() sorted = new EventEmitter<Todo[]>();

  sortbyPriority: boolean = false;
  sortbyDate: boolean = false;

  constructor(private todoService: TodoService) {}

  toggleSortByPriority() {
    this.sortbyPriority = !this.sortbyPriority;
    this.sortbyDate = false;
    if (this.sortbyPriority) {
      const sorted = this.sortTasksByPriority([...this.todos]);
      this.sorted.emit(sorted);
    } else {
      this.sorted.emit([...this.todos]); // reset to original
    }
  }

  toggleSortByDate() {
    this.sortbyDate = !this.sortbyDate;
    this.sortbyPriority = false;
    if (this.sortbyDate) {
      const sorted = this.sortTasksByCreationDate([...this.todos]);
      this.sorted.emit(sorted);
    } else {
      this.sorted.emit([...this.todos]);
    }
  }

  sortTasksByPriority(todos: Todo[]): Todo[] {
    return todos.sort((a, b) => {
      const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  sortTasksByCreationDate(todos: Todo[]): Todo[] {
    return todos.sort((a, b) => {
      const timeA = a.createAt ? new Date(a.createAt).getTime() : 0;
      const timeB = b.createAt ? new Date(b.createAt).getTime() : 0;
      return timeB - timeA;
    });
  }
}
