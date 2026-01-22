import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TasksService } from '../../../../core/services/tasks';
import { Task } from '../../../../core/models/task';
import { CommentsListComponent } from '../../components/comments-list/comments-list.component';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CommentsListComponent],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail {

  id = input.required<string>();

  private tasksService = inject(TasksService);

  task = signal<Task | undefined>(undefined);

  ngOnInit() {

    this.tasksService.getById(this.id()).subscribe({
      next: (t) => this.task.set(t),
      error: (err) => console.error('Task not found', err),
    });
  }
}
