import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getAll(): Observable<readonly Task[]> {
    return this.http.get<readonly Task[]>(`${this.baseUrl}/tasks`);
  }

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
  }

  create(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  }

  update(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/tasks/${id}`, task);
  }
}
