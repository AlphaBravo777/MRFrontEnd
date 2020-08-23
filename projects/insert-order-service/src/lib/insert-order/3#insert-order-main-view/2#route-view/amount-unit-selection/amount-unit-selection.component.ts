import { Component, OnInit } from '@angular/core';
import { ICustomRadioButton } from 'src/app/home/shared/components/custom-radio-group/radio-button-interface';
import { InsertFormChangesService } from '../../../1#insert-order-services/insert-form-changes.service';

@Component({
    selector: 'mr-insert-amount-unit-selection',
    templateUrl: './amount-unit-selection.component.html',
    styleUrls: ['./amount-unit-selection.component.scss']
})
export class AmountUnitSelectionComponent implements OnInit {

    radioButtons: ICustomRadioButton[] = [
        {name: 'Units', buttonid: 1},
        {name: 'Kg`s', buttonid: 2}
    ];
    defaultBotton: ICustomRadioButton = {name: 'Units', buttonid: 1};

    constructor(private insertFormChangesService: InsertFormChangesService) {}

    ngOnInit() {
        this.insertFormChangesService.insertProductUnitMeasurement(this.defaultBotton);
    }

    buttonPicked(button: ICustomRadioButton) {
        console.log('The button that was picked = ', button);
        this.insertFormChangesService.insertProductUnitMeasurement(button);
    }
}
