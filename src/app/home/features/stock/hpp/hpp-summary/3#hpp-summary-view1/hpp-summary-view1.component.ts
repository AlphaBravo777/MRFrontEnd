import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-hpp-summary-view1',
    templateUrl: './hpp-summary-view1.component.html',
    styleUrls: ['./hpp-summary-view1.component.scss']
})
export class HppSummaryView1Component implements OnInit {

    @Input() pnpProducts;
    @Input() meatriteStock;
    @Input() preHppStock;
    @Input() pnpOrder;
    @Input() pnpOutstandingOrders;
    @Input() postHppStock;
    @Input() hppLeakers;
    @Input() outstandingStock;
    @Input() amountOfOrders;

    constructor() {}

    ngOnInit() {
        console.log(this.outstandingStock);
    }

    switchStock(stock) {
        console.log('The stock that needs to be switced = ', stock);
    }




}
