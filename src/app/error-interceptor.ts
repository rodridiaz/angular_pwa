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
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const method = req.method;
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        if (['POST', 'PUT', 'DELETE'].includes(method)) {
          this.snackBar.open('User will be sent after you go online', null, {
            duration: 3000
          });
        } else {
          console.log(errorMessage);
        }
        this.router.navigate(['/']);
        return throwError(error);
      })
    );
  }
}
