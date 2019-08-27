import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOrderDetails } from '../../../#sharedServices/interfaces/order-service-Interfaces';
import { InsertOrderService } from '../../1#insert-order-services/insert-order.service';

@Component({
    selector: 'mr-insert-top-menu-view',
    templateUrl: './top-menu-view.component.html',
    styleUrls: ['./top-menu-view.component.scss']
})
export class TopMenuViewComponent implements OnInit {

    @Input() mainInsertForm: FormGroup;
    @Input() routeForm: FormGroup;

    constructor(private insertOrderService: InsertOrderService) {}

    ngOnInit() {}

    deleteOrder(order: IOrderDetails) {
        this.insertOrderService.deleteOrder(order);
    }
}
