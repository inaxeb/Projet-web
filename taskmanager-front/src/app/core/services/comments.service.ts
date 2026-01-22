import { Injectable, signal } from '@angular/core';

export interface Comment {
    id: string;
    taskId: string;
    authorPseudo: string;
    message: string;
    createdAt: Date;
}

@Injectable({
    providedIn: 'root',
})
export class CommentsService {

    private readonly _comments = signal<Comment[]>([]);

    readonly comments = this._comments.asReadonly();

    getComments(taskId: string): Comment[] {
        return this._comments().filter((c) => c.taskId === taskId);
    }

    addComment(taskId: string, message: string, authorPseudo: string): void {
        const newComment: Comment = {
            id: crypto.randomUUID(),
            taskId,
            message,
            authorPseudo,
            createdAt: new Date(),
        };

        this._comments.update((comments) => [...comments, newComment]);
    }
}
