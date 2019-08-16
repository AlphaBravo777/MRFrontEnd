import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { InsertFormChangesService } from '../1#insert-order-services/insert-form-changes.service';
import { FormGroup } from '@angular/forms';
import { InsertOrderService } from '../../#sharedServices/insert-order.service';
import { IInserOrderErrors } from '../../#sharedServices/insert-order-service-Interfaces';

@Component({
    selector: 'mr-insert-insert-order-data',
    templateUrl: './insert-order-data.component.html',
    styleUrls: ['./insert-order-data.component.scss']
})
export class InsertOrderDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    mainInsertForm: FormGroup;
    currentFormAccountID: number;
    errorMessages: IInserOrderErrors[] = [];

    constructor(private insertFormChangesService: InsertFormChangesService,
        private getDateService: GetDate$Service,
        private insertOrderService: InsertOrderService) {}

    ngOnInit() {
        // this.mainInsertForm = this.insertFormChangesService.getInsertForm();
        this.subscription = this.getDateService.currentDatePackage$.pipe(
            tap(date => this.checkIfAccountidAvailable()),
            tap(date => console.log('CURRENT FORM ACCOUNT ID = ', this.currentFormAccountID)),
            tap(date => this.mainInsertForm = this.insertFormChangesService.getInsertForm()),
            tap(date => this.insertFormChangesService.insertDatesAndUser(date)),
        ).subscribe();
        console.log('Form = ', this.mainInsertForm);
    }

    checkIfAccountidAvailable() {
        if (this.mainInsertForm) {
            this.currentFormAccountID = this.mainInsertForm.get('accountid').value;
        }
    }

    orderToInsert(order) {
        this.insertOrderService.insertNewOrder([order.value]).pipe(
            take(1),
            tap(response => {
                if ('error' in response) {
                    this.errorMessages.push({error: response.error});
                }
            })
        ).subscribe();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
