import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../../../../core/models/user';

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
    private usersService = inject(UsersService);

    users = this.usersService.users;

    banUser(user: User) {
        if (confirm(`Êtes-vous sûr de vouloir bannir ${user.pseudo} ?`)) {
            this.usersService.banUser(user.id);
            alert(`L'utilisateur ${user.pseudo} a été banni.`);
        }
    }
}
