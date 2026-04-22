import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoInputComponent } from './components/todo_input/todo_input';
import { TodoComponent } from './components/todo_component/todo_component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoInputComponent, TodoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 
}
