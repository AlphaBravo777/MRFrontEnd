import { Component, ErrorHandler, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@ng-stack/forms';
import { of, Subscription } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { SnackBarAlertService } from 'src/app/home/core/alerts/snack-bar-alert-service/snack-bar-alert.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IStockTakeInstance } from '../../../#shared-services/production-stock.interface';
import { StockCreateFormService } from '../../1#stock-create-services/stock-create-form.service';
import { StockCreateService } from '../../1#stock-create-services/stock-create.service';

@Component({
    selector: 'stock-new-stock-take-form',
    templateUrl: './new-stock-take-form.component.html',
    styleUrls: ['./new-stock-take-form.component.scss']
})
export class NewStockTakeFormComponent implements OnInit, OnDestroy {

    @Output() closeForm: EventEmitter<boolean> = new EventEmitter();
    newStockTakeForm: FormGroup<IStockTakeInstance>;
    subscription: Subscription;
    errorMessage: string

    constructor(
        private getDate$Service: GetDate$Service,
        private stockCreateFormService: StockCreateFormService,
        private stockCreateService: StockCreateService,
        private snackBarAlertService: SnackBarAlertService
    ) { }

    ngOnInit(): void {
        this.createStockTakeForm()
    }

    createStockTakeForm() {
        this.subscription = this.getDate$Service.currentDatePackage$.pipe(
            tap(datePackage => console.log('date: ', datePackage)),
            tap(datePackage => this.newStockTakeForm = this.stockCreateFormService.createNewStockTakeForm(datePackage))
        ).subscribe()
    }

    onSubmit() {
        console.log('The form that will be submitted: ', this.newStockTakeForm.value)
        this.stockCreateService.insertNewStockTakeInstance(this.newStockTakeForm.value).pipe(
            take(1),
            tap(() => this.snackBarAlertService.success('Stock take created', 'X', 3000)),
            tap(() => this.closeForm.emit(true)),
            catchError(error => {
                this.snackBarAlertService.alert(Object.keys(error.error)[0] + ': ' + error.error[Object.keys(error.error)[0]], 'X');
                return of(error);
            })
        ).subscribe()
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}
