import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.models';

@Injectable({
  providedIn: 'root'
})
export class TodoListLogicService {

  sortData(data: Todo[], sortActive: string, sortDirection: 'asc' | 'desc' | ''): Todo[] {
    if (!sortActive || sortDirection === '') {
      return [...data];
    }

    const isAsc = sortDirection === 'asc';

    const columnMap: Record<string, keyof Todo> = {
      'task': 'task',
      'status': 'completed',
      'priority': 'priority',
      'dateCreated': 'createAt'
    };

    const property = columnMap[sortActive];

    const priorityWeights: Record<string, number> = {
      'low': 1,
      'medium': 2,
      'high': 3
    };

    return [...data].sort((a, b) => {
      let valA = a[property];
      let valB = b[property];

      if (property === 'priority') {
        valA = priorityWeights[valA as string] || 0;
        valB = priorityWeights[valB as string] || 0;
      }

      if (valA == null && valB == null) return 0;
      if (valA == null) return isAsc ? -1 : 1;
      if (valB == null) return isAsc ? 1 : -1;

      const comparison = valA < valB ? -1 : valA > valB ? 1 : 0;
      return isAsc ? comparison : -comparison;
    });
  }
}