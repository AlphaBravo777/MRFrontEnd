import { Component, OnInit, OnDestroy } from '@angular/core';
import { InsertPnpCsvService } from '../1#insert-pnp-csv-services/insert-pnp-csv.service';
import { IOrderDetails } from '../../#sharedServices/insert-order-service-Interfaces';
import { InsertOrderService } from '../../#sharedServices/insert-order.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'mr-insert-insert-pnp-csv-data',
  templateUrl: './insert-pnp-csv-data.component.html',
  styleUrls: ['./insert-pnp-csv-data.component.scss']
})
export class InsertPnpCsvDataComponent implements OnInit, OnDestroy {

    constructor(private insertPnPCSVService: InsertPnpCsvService,
        private insertOrderService: InsertOrderService) {}

    selectedCSVFile = null;
    pnpOrders: IOrderDetails[];
    ordersNotInserted = [];
    subscription: Subscription;

    ngOnInit() {
        this.subscription = this.insertOrderService.currentOrdersNotInserted$.subscribe(data =>
            this.ordersNotInserted = data
        );
    }

    fileSelected(file) {
        this.insertPnPCSVService.fileSelected(file);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
