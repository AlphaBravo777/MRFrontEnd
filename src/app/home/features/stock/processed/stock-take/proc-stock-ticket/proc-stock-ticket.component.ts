import { Component, OnInit, Input } from '@angular/core';
import { ProcStockData$Service } from '../proc-stock-services/proc-stock-data$.service';

@Component({
    selector: 'app-proc-stock-ticket',
    templateUrl: './proc-stock-ticket.component.html',
    styleUrls: ['./proc-stock-ticket.component.scss']
})
export class ProcStockTicketComponent implements OnInit {

    @Input() singleProduct;

    constructor() { }

    ngOnInit() {
    }

    clicked() {
    }

}
