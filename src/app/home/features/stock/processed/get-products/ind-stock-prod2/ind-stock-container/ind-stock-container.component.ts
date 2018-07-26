import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../../../../../../node_modules/@angular/forms';

@Component({
    selector: 'app-ind-stock-container',
    templateUrl: './ind-stock-container.component.html',
    styleUrls: ['./ind-stock-container.component.css']
})
export class IndStockContainerComponent implements OnInit {

    constructor(private fb: FormBuilder) { }

    @Input() containerWithAmount;
    @Input() currentContainer: String;
    private amountForm: FormGroup;

    ngOnInit() {
        // console.log('+++ ', this.containerWithAmount.amount);
        // this.buildAmountForm(this.containerWithAmount.amount);
    }

    buildAmountForm(amounts) {
        this.amountForm = this.fb.group({
            amounting: this.fb.array(amounts),
        });
    }

}
