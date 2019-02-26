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
    flag = false;

    constructor() {}

    ngOnInit() {
    }

}
