import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOrderDetails } from '../../../#sharedServices/interfaces/order-service-Interfaces';
import { OrderService } from '../../../#sharedServices/order.service';

@Component({
    selector: 'mr-insert-top-menu-view',
    templateUrl: './top-menu-view.component.html',
    styleUrls: ['./top-menu-view.component.scss']
})
export class TopMenuViewComponent implements OnInit {

    @Input() mainInsertForm: FormGroup;
    @Input() routeForm: FormGroup;

    constructor(private orderService: OrderService) {}

    ngOnInit() {}

    deleteOrder(order: IOrderDetails) {
        this.orderService.deleteOrder(order);
    }
}
