export interface Todo {
    id?:number;
    task: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    createAt?: Date;
}
