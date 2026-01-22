import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../../core/services/comments.service';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="comments-section">
      <h3>Commentaires</h3>

      <div class="comments-list">
        @for (comment of comments(); track comment.id) {
          <div class="comment-item">
            <div class="comment-header">
              <span class="author">{{ comment.authorPseudo }}</span>
              <span class="date">{{ comment.createdAt | date:'short' }}</span>
            </div>
            <p class="message">{{ comment.message }}</p>
          </div>
        } @empty {
          <p class="no-comments">Aucun commentaire pour le moment.</p>
        }
      </div>

      <form [formGroup]="commentForm" (ngSubmit)="onSubmit()" class="comment-form">
        <div class="form-group">
          <textarea
            formControlName="message"
            placeholder="Écrire un commentaire..."
            rows="3"
          ></textarea>
        </div>
        <button type="submit" [disabled]="commentForm.invalid || !authService.isAuthenticated()">
          Envoyer
        </button>
      </form>
    </div>
  `,
  styles: [`
    .comments-section {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
    }
    .comment-item {
      background: #f9f9f9;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .comment-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
      color: #666;
    }
    .author {
      font-weight: bold;
      color: #333;
    }
    .comment-form {
      margin-top: 1.5rem;
    }
    textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
    }
    button {
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class CommentsListComponent {
  taskId = input.required<string>();

  private fb = inject(FormBuilder);
  private commentsService = inject(CommentsService);
  public authService = inject(AuthService);

  commentForm = this.fb.nonNullable.group({
    message: ['', [Validators.required, Validators.minLength(3)]],
  });


  comments = this.commentsService.comments;

  onSubmit() {
    if (this.commentForm.valid && this.authService.user()) {
      const message = this.commentForm.getRawValue().message;
      this.commentsService.addComment(
        this.taskId(),
        message,
        this.authService.user()!.pseudo
      );
      this.commentForm.reset();
    }
  }
}
