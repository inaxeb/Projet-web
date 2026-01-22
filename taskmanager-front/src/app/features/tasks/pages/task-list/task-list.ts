import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TasksService } from '../../../../core/services/tasks';
import { Task, TaskStatus } from '../../../../core/models/task';
import { StatusSelectorComponent } from '../../../../shared/components/status-selector/status-selector.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, RouterLink, StatusSelectorComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskListComponent {
  private readonly tasksService = inject(TasksService);

  readonly tasks = signal<readonly Task[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);


  readonly filter = signal<'ALL' | 'PENDING' | 'IN_PROGRESS' | 'DONE'>('ALL');

  readonly displayedTasks = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'ALL') return tasks;
    return tasks.filter((t) => t.status === filter);
  });

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
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

  setFilter(filter: 'ALL' | 'PENDING' | 'IN_PROGRESS' | 'DONE'): void {
    this.filter.set(filter);
  }

  deleteTask(task: Task): void {
    if (confirm(`Voulez-vous vraiment supprimer la tâche "${task.title}" ?`)) {
      this.tasksService.deleteById(task.id).subscribe({
        next: () => {
          this.tasks.update((tasks) => tasks.filter((t) => t.id !== task.id));
        },
        error: () => alert('Erreur lors de la suppression'),
      });
    }
  }

  changeStatus(task: Task, newStatus: TaskStatus): void {
    this.tasksService.update(task.id, { status: newStatus }).subscribe({
      next: (updatedTask) => {
        this.tasks.update((tasks) =>
          tasks.map((t) => (t.id === task.id ? updatedTask : t))
        );
      },
      error: () => alert('Impossible de mettre à jour le statut'),
    });
  }
}
