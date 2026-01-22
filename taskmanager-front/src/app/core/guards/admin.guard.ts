import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (authService.isAdmin()) {
        return true;
    }

    return router.createUrlTree(['/tasks']);
};
