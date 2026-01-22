import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../../core/models/task';

@Component({
    selector: 'app-status-selector',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './status-selector.component.html',
    styleUrl: './status-selector.component.scss'
})
export class StatusSelectorComponent {
    currentStatus = input.required<TaskStatus>();
    statusChange = output<TaskStatus>();

    isOpen = signal(false);

    readonly statuses: { value: TaskStatus; label: string; color: string }[] = [
        { value: 'PENDING', label: 'À faire', color: '#ffc107' },
        { value: 'IN_PROGRESS', label: 'En cours', color: '#17a2b8' },
        { value: 'DONE', label: 'Terminée', color: '#28a745' }
    ];

    toggleDropdown(event: Event) {
        event.stopPropagation();
        event.preventDefault();
        this.isOpen.update(v => !v);
    }

    selectStatus(status: TaskStatus, event: Event) {
        event.stopPropagation();
        this.statusChange.emit(status);
        this.isOpen.set(false);
    }

    getLabel(status: TaskStatus): string {
        return this.statuses.find(s => s.value === status)?.label || status;
    }

    getColor(status: TaskStatus): string {
        return this.statuses.find(s => s.value === status)?.color || '#ccc';
    }
}
