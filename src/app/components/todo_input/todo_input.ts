import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.models';
import { TodoInputLogicService } from '../../services/todo_input.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  templateUrl: './todo_input.html',
  styleUrls: ['./todo_input.scss'],
  imports: [FormsModule]
})


export class TodoInputComponent implements OnInit {

  newTaskText: string = '';
  selectedPriority: 'low' | 'medium' | 'high' = 'low';
  headerPhrase: string = '';

  constructor(private todoService: TodoService, private todoInputLogicService: TodoInputLogicService) { }

  ngOnInit() {
    this.headerPhrase = this.todoInputLogicService.getRandomPhrase();
  }

  setPriority(p: 'low' | 'medium' | 'high') {
    this.selectedPriority = p;
  }

  onFormSubmit() {
    if (this.newTaskText.length > 0) {
      const order: Todo = {
        task: this.newTaskText,
        priority: this.selectedPriority,
        completed: false
      };

      this.todoService.addTodo(order);
      this.newTaskText = '';
    }
  }
}