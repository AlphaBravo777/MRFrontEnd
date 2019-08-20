import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IInserOrderErrors } from '../../#sharedServices/insert-order-service-Interfaces';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

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
    @Output() orderToInsert: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}

    amountFormSubmit() {
        console.log('Form is getting submitted', this.mainInsertForm);
    }
}
