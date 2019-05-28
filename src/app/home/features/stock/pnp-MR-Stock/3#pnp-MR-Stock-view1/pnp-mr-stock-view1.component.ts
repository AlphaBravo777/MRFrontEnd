import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pnp-mr-stock-view1',
    templateUrl: './pnp-mr-stock-view1.component.html',
    styleUrls: ['./pnp-mr-stock-view1.component.scss']
})
export class PnpMrStockView1Component implements OnInit {

    @Input() pnpStockForm;
    @Input() formBatchesNamesValid;
    @Output() addBatch: EventEmitter<any> = new EventEmitter<any>();
    @Output() pnpStockFormSubmit: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {
        console.log('The form currently looks like: ', this.pnpStockForm);

    }





}
