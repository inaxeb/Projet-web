import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  error = false;

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = false;
    const { email, password } = this.form.getRawValue();


    this.authService.login({ username: email, password }).subscribe({
      next: () => this.router.navigateByUrl('/tasks'),
      error: () => {
        this.error = true;
      }
    });
  }
}
