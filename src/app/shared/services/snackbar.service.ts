import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})

export class SnackBarService {
    constructor(private snackBar: MatSnackBar) {}
    public openSnackBar(message: string) {
        this.snackBar.open(
          message,
          'Close',
          { duration: 10000 }
        );
    }
}
