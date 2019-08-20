import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { tap, take, switchMap } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { InsertFormChangesService } from '../1#insert-order-services/insert-form-changes.service';
import { FormGroup } from '@angular/forms';
import { OrderService } from '../../#sharedServices/order.service';
import { IInserOrderErrors, IOrderDetails } from '../../#sharedServices/insert-order-service-Interfaces';
import { InsertOrderService } from '../1#insert-order-services/insert-order.service';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { InsertOrderData$Service } from '../1#insert-order-services/insert-order-data$.service';

@Component({
    selector: 'mr-insert-insert-order-data',
    templateUrl: './insert-order-data.component.html',
    styleUrls: ['./insert-order-data.component.scss']
})
export class InsertOrderDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    mainInsertForm: FormGroup;
    errorMessages: IInserOrderErrors[] = [];
    datePackage: IDate;

    constructor(private insertFormChangesService: InsertFormChangesService,
        private getDateService: GetDate$Service,
        private orderService: OrderService,
        private insertOrderService: InsertOrderService,
        private insertOrderData$Service: InsertOrderData$Service) {}

    ngOnInit() {
        this.mainInsertForm = this.insertFormChangesService.getInsertForm();
        const datePackage$: Observable<IDate> = this.getDateService.currentDatePackage$;
        const formChanges$: Observable<any> = this.mainInsertForm.get('accountMRid').valueChanges;
        const currentWorkingAccount$: Observable<IAccountDetails> = this.insertOrderData$Service.currentWorkingAccount$;

        // Maybe we should subscribe to a data$ observable that has the latest account in it, and just give this through when needed

        this.subscription = combineLatest([datePackage$, currentWorkingAccount$]).pipe(
            tap(data => console.log('---- COMBINELATEST HAVE CHANGED ----' , data)),
            tap(data => this.datePackage = <IDate>data[0]),
            // switchMap(() => currentWorkingAccount$),
            // switchMap(() => this.insertOrderData$Service.currentWorkingAccount$),
            // tap(data => this.insertFormChangesService.insertDatesAndUser(<IDate>data[0])),  // refracture this some place else
            switchMap(data => this.insertOrderService.datePackageOrAccountChanged(
                <IAccountDetails>data[1], this.datePackage))
        ).subscribe();

        // this.subscription = this.getDateService.currentDatePackage$.pipe(
        //     // tap(date => this.checkIfAccountidAvailable()),
        //     // tap(date => console.log('CURRENT FORM ACCOUNT ID = ', this.currentFormAccountID)),
        //     // tap(date => this.mainInsertForm = this.insertFormChangesService.getInsertForm()),
        //     tap(date => this.insertFormChangesService.insertDatesAndUser(date)),
        // ).subscribe();
    }

    insertOrderIntoDB(order) {
        this.orderService.insertNewOrder([order.value]).pipe(
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
