import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderService } from '../../../#sharedServices/order.service';
import { IOrderDetails } from '../../../#sharedServices/interfaces/insert-order-service-Interfaces';

@Component({
    selector: 'mr-insert-top-menu-view',
    templateUrl: './top-menu-view.component.html',
    styleUrls: ['./top-menu-view.component.scss']
})
export class TopMenuViewComponent implements OnInit {

    @Input() mainInsertForm: FormGroup;
    @Input() routeForm: FormGroup;

    constructor(private insertOrderService: OrderService) {}

    ngOnInit() {}

    deleteOrder(order: IOrderDetails) {
        this.insertOrderService.deleteOrder(order);
    }
}
