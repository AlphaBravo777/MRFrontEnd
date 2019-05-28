import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HppTransferService } from '../1#hpp-transfer-services/hpp-transfer.service';

@Component({
    selector: 'app-hpp-stock-transfer-view1',
    templateUrl: './hpp-stock-transfer-view1.component.html',
    styleUrls: ['./hpp-stock-transfer-view1.component.scss']
})
export class HppStockTransferView1Component implements OnInit {

    @Input() headingNames;
    @Input() productArray;
    @Output() changeAmount: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {
        console.log('Product array = ', this.productArray);
    }

}
