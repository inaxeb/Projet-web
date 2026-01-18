import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody: any = exception.getResponse();
      message = responseBody.message || exception.message;
      error = responseBody.error || 'Http Exception';
    } else if (exception instanceof QueryFailedError) {
      // Gestion spécifique des erreurs TypeORM / Postgres
      const err: any = exception;
      // Code 23505 = Unique Violation (Doublon)
      if (err.code === '23505') {
        status = HttpStatus.CONFLICT;
        message = 'Username already exists';
        error = 'Conflict';
      } else {
        // Autres erreurs SQL
        this.logger.error(`Database Error: ${err.message}`, err.stack);
      }
    } else {
      // Autres erreurs inconnues
      if (exception instanceof Error) {
        this.logger.error(`Unexpected Error: ${exception.message}`, exception.stack);
      } else {
        this.logger.error(`Unexpected Error: ${exception}`);
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: error,
      message: message,
    });
  }
}
