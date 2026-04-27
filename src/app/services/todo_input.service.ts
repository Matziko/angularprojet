import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoInputLogicService {

  private phrases: string[] = [
    "What's the plan for today?",
    "Got something new to achieve?",
    "Type it, do it, crush it.",
    "Let's get organized!",
    "One task at a time..."
  ];

  getRandomPhrase(): string {
    const index = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[index];
  }
}