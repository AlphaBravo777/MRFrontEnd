import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '../../../../../node_modules/@angular/material';
import { DialogBoxComponent } from './dialog-box.component';
import { StockAPIService } from '../../features/stock/stock-services/stock-api.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DialogBoxService {

    constructor(public dialog: MatDialog, private stockAPI: StockAPIService, private router: Router) { }

    dialogRef: MatDialogRef<DialogBoxComponent>;

    openConfirmationDialog() {
        this.dialogRef = this.dialog.open(DialogBoxComponent, {
            panelClass: 'my-centered-dialog',
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = 'The stock did not safe correctly, check connection and try again!';
        this.dialogRef.componentInstance.dialogtype = 'confirmMessage';

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // do confirmation actions
            }
            this.dialogRef = null;
        });
    }

    openStockClearedDialog() {
        this.dialogRef = this.dialog.open(DialogBoxComponent, {
            panelClass: 'my-centered-dialog',
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to clear all stock';
        this.dialogRef.componentInstance.dialogtype = 'stockCleared';

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                localStorage.removeItem(this.stockAPI.workingProcStock);
            }
            this.dialogRef = null;
        });
    }

    openStockClearedHalfDialog(): Observable<any> {
        this.dialogRef = this.dialog.open(DialogBoxComponent, {
            panelClass: 'my-centered-dialog',
            disableClose: false
        });
        // tslint:disable-next-line
        this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to clear only specific products (As chosen by the shift manager)';
        this.dialogRef.componentInstance.dialogtype = 'stockCleared';

        return this.dialogRef.afterClosed().pipe(
            map(result => {
            if (result) {
                this.dialogRef = null;
                return true;
            } else {
                this.dialogRef = null;
                return false;
            }
        }));
    }

    passwordNotCorrect() {
        this.dialogRef = this.dialog.open(DialogBoxComponent, {
            panelClass: 'my-centered-dialog',
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = 'The password is wrong (Is Caps-Lock on?) or the time have expired';
        this.dialogRef.componentInstance.dialogtype = 'noPassword';

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // do confirmation actions
            }
            this.dialogRef = null;
        });
    }

}
