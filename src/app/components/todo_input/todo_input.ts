import { Component,OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  templateUrl: './todo_input.html',
  styleUrls: ['./todo_input.scss'],
  imports: [FormsModule]
})
export class TodoInputComponent implements OnInit{
  newTaskText: string = '';
  selectedPriority: 'low' | 'medium' | 'high' = 'low';
  headerPhrase: string = '';


private phrases: string[] = [
    "What's the plan for today?",
    "Got something new to achieve?",
    "Type it, do it, crush it.",
    "Let's get organized!",
    "One task at a time..."
  ];
  
  constructor(private todoService: TodoService) {}

ngOnInit() {
    const index = Math.floor(Math.random() * this.phrases.length);
    this.headerPhrase = this.phrases[index];
  }

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