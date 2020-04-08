import { SnackBarService } from './../services/snackbar.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private snackBar: SnackBarService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                let errorMessage = 'An unknown error has been occured';
                if (err.error.errors) {
                    errorMessage = err.error.errors[0].message;
                }
                this.snackBar.openSnackBar(errorMessage);
                return throwError(err);
            })
        );
    }
}
