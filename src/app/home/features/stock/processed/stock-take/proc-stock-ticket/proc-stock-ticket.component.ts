import { Component, OnInit, Input } from '@angular/core';

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
        console.log('I was clicked');
    }

}
