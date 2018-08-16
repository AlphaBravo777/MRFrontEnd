import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '../../../../../node_modules/@angular/material';
import { DialogBoxComponent } from './dialog-box.component';
import { Observable } from '../../../../../node_modules/rxjs';
import { StockAPIService } from '../../features/stock/stock-services/stock-api.service';
import { Router } from '../../../../../node_modules/@angular/router';

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

    openStockClearedDialog(stocktime) {
        this.dialogRef = this.dialog.open(DialogBoxComponent, {
            panelClass: 'my-centered-dialog',
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to clear all stock for ' + stocktime;
        this.dialogRef.componentInstance.dialogtype = 'stockCleared';

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.stockAPI.deleteAllTimeProcessedStock(stocktime)
                    .subscribe(x => {
                        console.log(x);
                        this.router.navigate(['user/user-nav/']);
                    });
            }
            this.dialogRef = null;
        });
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
