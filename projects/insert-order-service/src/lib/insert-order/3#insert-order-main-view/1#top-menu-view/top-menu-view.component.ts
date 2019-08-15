import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InsertOrderService } from '../../../#sharedServices/insert-order.service';

@Component({
    selector: 'mr-insert-top-menu-view',
    templateUrl: './top-menu-view.component.html',
    styleUrls: ['./top-menu-view.component.scss']
})
export class TopMenuViewComponent implements OnInit {

    @Input() mainInsertForm: FormGroup;

    constructor(private insertOrderService: InsertOrderService) {}

    ngOnInit() {}

    deleteOrder(orderid) {
        console.log('Delete button clicked: ', orderid);
        this.insertOrderService.deleteOrder(orderid);
    }
}
