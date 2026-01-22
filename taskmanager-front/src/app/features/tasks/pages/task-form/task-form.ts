import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TasksService } from '../../../../core/services/tasks';
import { Task } from '../../../../core/models/task';

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './task-form.html',
    styleUrl: './task-form.scss'
})
export class TaskFormComponent {
    private fb = inject(FormBuilder);
    private tasksService = inject(TasksService);
    private router = inject(Router);


    id = input<string>();

    form = this.fb.nonNullable.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required]],
    });

    error = false;
    isEditMode = signal(false);

    ngOnInit() {
        if (this.id()) {
            this.isEditMode.set(true);
            this.tasksService.getById(this.id()!).subscribe({
                next: (task) => this.form.patchValue(task),
                error: () => this.router.navigate(['/tasks'])
            });
        }
    }

    submit() {
        if (this.form.invalid) return;

        this.error = false;
        const taskData = this.form.getRawValue();

        const request$ = this.isEditMode()
            ? this.tasksService.update(this.id()!, taskData)
            : this.tasksService.create(taskData);

        request$.subscribe({
            next: () => this.router.navigate(['/tasks']),
            error: () => this.error = true
        });
    }
}
