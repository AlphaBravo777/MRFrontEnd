import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { tap, take, switchMap, concatMap } from 'rxjs/operators';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { InsertFormChangesService } from '../1#insert-order-services/insert-form-changes.service';
import { FormGroup } from '@angular/forms';
import { OrderService } from '../../#sharedServices/order.service';
import { IInserOrderErrors, IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { InsertOrderService } from '../1#insert-order-services/insert-order.service';
import { InsertOrderData$Service } from '../1#insert-order-services/insert-order-data$.service';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { IAccountDetails } from 'projects/accounts-service/src/lib/#sharedServices/interfaces/account-interface';

@Component({
    selector: 'mr-insert-insert-order-data',
    templateUrl: './insert-order-data.component.html',
    styleUrls: ['./insert-order-data.component.scss']
})
export class InsertOrderDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    mainInsertForm: FormGroup;
    routeForm: FormGroup;
    errorMessages: IInserOrderErrors[] = [];
    datePackage: IDate;

    constructor(private insertFormChangesService: InsertFormChangesService,
        private getDateService: GetDate$Service,
        private orderService: OrderService,
        private insertOrderService: InsertOrderService,
        private insertOrderData$Service: InsertOrderData$Service) {}

    ngOnInit() {
        this.mainInsertForm = this.insertFormChangesService.getOrderInsertForm();
        this.routeForm = this.insertFormChangesService.getRouteInsertForm();
        this.subscribeToAccountAndDateChanges();
    }

    subscribeToAccountAndDateChanges() {
        const datePackage$: Observable<IDate> = this.getDateService.currentDatePackage$;
        const currentWorkingAccount$: Observable<IAccountDetails> = this.insertOrderData$Service.currentWorkingAccount$;

        this.subscription = this.orderService.getAllRoutes().pipe(
            tap(routes => this.insertOrderData$Service.setRoutes(routes)),
            concatMap(() => combineLatest([datePackage$, currentWorkingAccount$])),
            tap(data => console.log('---- COMBINELATEST HAVE CHANGED ----' , data)),
            tap(data => this.datePackage = <IDate>data[0]),
            switchMap(data => this.insertOrderService.datePackageOrAccountChanged(<IAccountDetails>data[1], this.datePackage))
        ).subscribe();
    }

    // Gets called from template
    insertOrderIntoDB(orders: [IOrderDetails, IRoute]) {
        console.log('Order to insert = ', orders);
        orders[0].routeid = orders[1].routeid;
        orders[0].routeName = orders[1].routeName;
        this.orderService.insertNewOrderAndProducts([orders[0]]).pipe(
            take(1),
            tap(response => {
                if ('error' in response) {
                    this.errorMessages.push({error: response.error});
                } else {
                    console.log('Here is the response from the insert: ', response);
                    this.insertFormChangesService.resetOrderForm();
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
