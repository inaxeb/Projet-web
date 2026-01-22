import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../../../core/services/tasks';
import { AuthService } from '../../../../core/services/auth';
import { Task } from '../../../../core/models/task';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    private tasksService = inject(TasksService);
    public authService = inject(AuthService);

    tasks = signal<readonly Task[]>([]);


    totalTasksCount = computed(() => this.tasks().length);
    doneTasksCount = computed(() => this.tasks().filter((t) => t.status === 'DONE').length);
    myTasksCount = computed(() => {
        const user = this.authService.user();
        if (!user) return 0;
        return this.tasks().filter((t) => t.assignedToUserId === user.id).length;
    });

    completionPercentage = computed(() => {
        const total = this.totalTasksCount();
        if (total === 0) return 0;
        return Math.round((this.doneTasksCount() / total) * 100);
    });

    ngOnInit() {
        this.tasksService.getAll().subscribe((tasks) => {
            this.tasks.set(tasks);
        });
    }
}
