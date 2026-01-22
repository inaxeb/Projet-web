import { Injectable, signal } from '@angular/core';
import { User, UserRole } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UsersService {

    private readonly _users = signal<User[]>([
        { id: '1', email: 'admin@test.com', pseudo: 'AdminUser', role: 'ADMIN' },
        { id: '2', email: 'user@test.com', pseudo: 'BasicUser', role: 'USER' },
        { id: '3', email: 'guest@test.com', pseudo: 'GuestUser', role: 'USER' },
    ]);

    readonly users = this._users.asReadonly();

    getAll(): User[] {
        return this._users();
    }

    banUser(userId: string): void {
        this._users.update((users) => users.filter((u) => u.id !== userId));
    }
}
