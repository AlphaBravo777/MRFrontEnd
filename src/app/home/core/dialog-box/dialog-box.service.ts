import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '../../../../../node_modules/@angular/material';
import { DialogBoxComponent } from './dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {

  constructor(public dialog: MatDialog) { }

  dialogRef: MatDialogRef<DialogBoxComponent>;

  openConfirmationDialog() {
    this.dialogRef = this.dialog.open(DialogBoxComponent, {
        panelClass: 'my-centered-dialog',
        disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'You are about to leave stocktaking page, do you want to save stock?';

    this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
            // do confirmation actions
        }
        this.dialogRef = null;
    });
}

}
