import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo_input.html',
  styleUrls: ['./todo_input.scss'],
  imports: [FormsModule]
})
export class TodoInputComponent {
  newTaskText: string = '';
  selectedPriority: 'low' | 'medium' | 'high' = 'low';

  constructor(private todoService: TodoService) {}

  setPriority(p: 'low' | 'medium' | 'high') {
    this.selectedPriority = p;
  }

  onFormSubmit() {
    if (this.newTaskText.length > 0) {
      const order = {
        task: this.newTaskText,
        priority: this.selectedPriority,
        completed: false
      };
      this.todoService.addTodo(order).subscribe(() => {
        this.newTaskText = '';
      });
    }
  }
}