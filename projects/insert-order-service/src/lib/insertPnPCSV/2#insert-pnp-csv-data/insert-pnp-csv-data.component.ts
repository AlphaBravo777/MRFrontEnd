import { Component, OnInit, OnDestroy } from '@angular/core';
import { InsertPnpCsvService } from '../1#insert-pnp-csv-services/insert-pnp-csv.service';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { OrderService } from '../../#sharedServices/order.service';
import { Subscription } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { IProductOrderDetails } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';


@Component({
  selector: 'mr-insert-insert-pnp-csv-data',
  templateUrl: './insert-pnp-csv-data.component.html',
  styleUrls: ['./insert-pnp-csv-data.component.scss']
})
export class InsertPnpCsvDataComponent implements OnInit, OnDestroy {

    constructor(private insertPnPCSVService: InsertPnpCsvService,
        private insertOrderService: OrderService) {}

    selectedCSVFile = null;
    pnpOrders: IOrderDetails[];
    ordersNotInserted: IOrderDetails[] = [];
    ordersInserted: IOrderDetails[] = [];
    unknownProducts: IProductOrderDetails[];
    subscription: Subscription;

    ngOnInit() {
        this.subscription = this.insertOrderService.currentOrdersNotInserted$.pipe(
            tap(orders => this.ordersNotInserted = orders),
            concatMap(() => this.insertOrderService.currentUnknownProducts$),
            tap(unknownProducts => this.unknownProducts = unknownProducts),
            concatMap(() => this.insertOrderService.currentOrdersInserted$),
            tap(ordersInserted => this.ordersInserted = ordersInserted),
        ).subscribe();
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
