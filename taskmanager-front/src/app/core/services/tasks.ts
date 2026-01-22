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

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
  }
}
