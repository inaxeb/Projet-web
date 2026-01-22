import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TasksService } from '../../../../core/services/tasks';
import { Task } from '../../../../core/models/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskListComponent {
  private readonly tasksService = inject(TasksService);

  readonly tasks = signal<readonly Task[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.tasksService.getAll().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Impossible de charger les tâches.');
        this.loading.set(false);
      },
    });
  }

  deleteTask(task: Task): void {
    const ok = confirm(`Supprimer la tâche "${task.title}" ?`);
    if (!ok) return;

    this.tasksService.deleteById(task.id).subscribe({
      next: () => {
        this.tasks.update(list => list.filter(t => t.id !== task.id));
      },
      error: () => alert('Suppression impossible.'),
    });
  }
}
