import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class SnackBarAlertService {

    private setAutoHide = true;
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(public snackBar: MatSnackBar) {}

    // You might get an error if you pass in a time that is less that 1000ms (1s)

    alertBackendError(error) {
        let errorMessage = '';
        const e = error.error;
        for (const key in e) {
            if (e.hasOwnProperty(key)) {
                errorMessage = errorMessage + key + ': ' + e[key] + '\n';
            }
        }
        this.alert(errorMessage, 'X', 5000)
    }

    alert(message: string = 'no message', action: string = 'X', autoHideTime: number = 10000) {
        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? autoHideTime : 0;
        config.panelClass = ['alert-message'];
        this.snackBar.open(message, action, config);
    }

    success(message: string = 'no message', action: string = 'X', autoHideTime: number = 10000) {
        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? autoHideTime : 0;
        config.panelClass = ['success-message'];
        this.snackBar.open(message, action, config);
    }

    caution(message: string = 'no message', action: string = 'X', autoHideTime: number = 10000) {
        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.setAutoHide ? autoHideTime : 0;
        config.panelClass = ['caution-message'];
        this.snackBar.open(message, action, config);
    }
}
