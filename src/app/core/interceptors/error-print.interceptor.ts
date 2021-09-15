import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';
import { tap } from 'rxjs/operators';

const messagesByCode: { [key: number]: string } = {
  401: `Unauthorized. Did you forget to include auth token?`,
  403: `Access Denied. Please check your username and password`,
};

@Injectable()
export class ErrorPrintInterceptor implements HttpInterceptor {
  constructor(private readonly notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (error: unknown) => {
          const url = new URL(request.url);

          const message =
            messagesByCode[this.getErrorStatus(error)] ||
            `Request to "${url.pathname}" failed. Check the console for the details`;

          this.notificationService.showError(message, 0);
        },
      })
    );
  }

  private getErrorStatus(error: unknown): number {
    return (
      error instanceof Object &&
      error.hasOwnProperty('status') &&
      (error as any).status
    );
  }
}
