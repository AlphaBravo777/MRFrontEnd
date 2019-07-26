import { Component, OnInit, OnDestroy } from '@angular/core';
import { InsertOrderData$Service } from '../1#insert-order-services/insert-order-data$.service';
import { Subscription } from 'rxjs';
import { DynamicFormService } from 'src/app/home/shared/dynamic-form/dynamic-form-services/dynamic-form.service';
import { IFormControl } from 'src/app/home/shared/dynamic-form/dynamic-form-services/form-control-interface';
import { tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { InsertFormService } from '../1#insert-order-services/insert-form.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { FormGroupTypeSafe } from 'src/app/home/core/reactive-forms/reactive-forms-helper';
import { IOrderDBDetails } from '../../#sharedServices/insert-order-service-Interfaces';

@Component({
    selector: 'mr-insert-insert-order-data',
    templateUrl: './insert-order-data.component.html',
    styleUrls: ['./insert-order-data.component.scss']
})
export class InsertOrderDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    mainInsertForm: FormGroup;
    datePackage: IDate;

    constructor(private insertFormService: InsertFormService, private getDateService: GetDate$Service) {}

    ngOnInit() {
        this.mainInsertForm = this.insertFormService.getInsertForm();
        this.subscription = this.getDateService.currentDatePackage$.pipe(
            tap(date => this.setDates(date)),
        ).subscribe();
        console.log('Form = ', this.mainInsertForm);
    }

    setDates(datePackage: IDate) {
        this.datePackage = datePackage;
        this.mainInsertForm.get('timeStampid').setValue(datePackage.id);
        this.mainInsertForm.get('orderDate').setValue(datePackage.shortDate);
        // this.form.get('controlName').setValue('new value');
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
