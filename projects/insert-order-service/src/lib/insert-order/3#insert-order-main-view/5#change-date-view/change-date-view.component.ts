import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { IOrderDetails } from '../../../#sharedServices/interfaces/order-service-Interfaces';
import { InsertFormChangesService } from '../../1#insert-order-services/insert-form-changes.service';
import { InsertOrderService } from '../../1#insert-order-services/insert-order.service';

@Component({
    selector: 'mr-insert-change-date-view',
    templateUrl: './change-date-view.component.html',
    styleUrls: ['./change-date-view.component.scss']
})
export class ChangeDateViewComponent implements OnInit {

    // Create a view that give a date icon, where you can change the date and get a timestamp for the date you chose
    // Put this view under the select route window
    // When a date is chosen immdetiatly update the order, change the date timestamp and send it to the "update" link
    // After this send the orderid again to the data service, so that it triggers an order reload action up the chain

    constructor(private getDate$Service: GetDate$Service, private insertFormChangesService: InsertFormChangesService,
        private insertOrderService: InsertOrderService) {}

    @Input() mainInsertForm: FormGroup;
    @Input() routeForm: FormGroup;
    @Output() orderToInsert: EventEmitter<[IOrderDetails, IRoute]> = new EventEmitter<[IOrderDetails, IRoute]>();
    subscription: Subscription;
    dateToChangeToo: IDate;
    currentTimestampid: number;

    ngOnInit() {
        this.currentTimestampid = this.mainInsertForm.get('timeStampid').value;
        console.log('Timestampid = ', this.mainInsertForm.get('timeStampid'));

    }

    setTimeStampid(newDate: IDate) {
        this.mainInsertForm.get('timeStampid').setValue(newDate.id);
        this.mainInsertForm.get('timeStampID').setValue(newDate.timeStampID);
    }

    finalChecksBeforeInsertingOrder() {
        let returnForm;
        this.insertFormChangesService.removeAnyOrderedProductsFromAvailableList();
        this.insertFormChangesService.makeSureAllMRProductidsAreUpperCase();
        this.insertOrderService.changeAmountMeasurementToUnitsIfCurrentlyKgs(this.mainInsertForm, this.routeForm);
        returnForm = this.mainInsertForm.value;
        returnForm.productListToPickFrom = null;
        this.orderToInsert.emit([returnForm, this.routeForm.value]);
    }

    getLongDate(date: Date) {
        date = new Date(date.valueOf() + (120 * 60000));
        console.log(date);
        this.subscription = this.getDate$Service.getDatePackageForGivenLongDate(date).pipe(
            take(1),
            tap(newDate => this.dateToChangeToo = newDate),
            tap(newDate => this.setTimeStampid(newDate)),
            tap(() => this.finalChecksBeforeInsertingOrder()),
            // finalize(() => this.setAccountId to the same account id to reload)
        ).subscribe();
    }

}
