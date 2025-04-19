import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Task {
  id?: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = `${environment.apiBaseUrl}/api/tasks`; 

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }
}