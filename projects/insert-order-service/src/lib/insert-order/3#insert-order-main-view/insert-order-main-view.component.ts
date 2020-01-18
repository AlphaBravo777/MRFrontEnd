import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IInserOrderErrors, IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { InsertFormChangesService } from '../1#insert-order-services/insert-form-changes.service';
import { InsertOrderService } from '../1#insert-order-services/insert-order.service';

@Component({
    selector: 'mr-insert-insert-order-main-view',
    templateUrl: './insert-order-main-view.component.html',
    styleUrls: ['./insert-order-main-view.component.scss']
})
export class InsertOrderMainViewComponent implements OnInit {

    @Input() mainInsertForm: FormGroup;
    @Input() routeForm: FormGroup;
    @Input() datePackage: IDate;
    @Input() errorMessages: IInserOrderErrors[];
    @Output() orderToInsert: EventEmitter<[IOrderDetails, IRoute]> = new EventEmitter<[IOrderDetails, IRoute]>();

    returnForm;

    constructor(private insertFormChangesService: InsertFormChangesService,
        private insertOrderService: InsertOrderService) {}

    ngOnInit() {}

    amountFormSubmit() {
        console.log('Form is getting submitted', this.mainInsertForm);
    }

    finalChecksBeforeInsertingOrder() {
        this.insertFormChangesService.removeAnyOrderedProductsFromAvailableList();
        this.insertFormChangesService.makeSureAllMRProductidsAreUpperCase();
        this.insertOrderService.changeAmountMeasurementToUnitsIfCurrentlyKgs(this.mainInsertForm, this.routeForm);
        this.returnForm = this.mainInsertForm.value;
        this.returnForm.productListToPickFrom = null;
        this.orderToInsert.emit([this.returnForm, this.routeForm.value]);
    }
}
