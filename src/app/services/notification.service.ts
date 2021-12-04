import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  onDefault(message: string): void {
    this._snackBar.open(`${message}`, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:5000
    });
  }
  onSuccess(message: string,): void {
    this._snackBar.open(`${message}`, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:5000
    });
  }
  onInfo(message: string,): void {
    this._snackBar.open(`${message}`, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:5000
    });
  }
  onWarning(message: string,): void {
    this._snackBar.open(`${message}`, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  onError(message: string,): void {
    this._snackBar.open(`${message}`, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
