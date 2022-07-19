import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MessageUtils} from '../@theme/messages/message-utils';

export const maxRetries = 2;
export const delayMs = 2000;

export interface ErrorField {
  field: string;
  message: string;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private messageUtils: MessageUtils,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        // if (event instanceof HttpErrorResponse) {
        //   console.log('--httperrorresponse---');
        // }
      },
       (event: HttpErrorResponse) => {
          this.messageUtils.showAppError(event.error);
        }));
  }
}
