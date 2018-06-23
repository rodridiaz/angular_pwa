import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const method = req.method;
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        if (method === 'POST') {
          this.snackBar.open('User will be sent after you go online', null, {
            duration: 3000
          });
        } else {
          this.snackBar.open(errorMessage, null, {
            duration: 2000
          });
        }
        return throwError(error);
      })
    );
  }
}
