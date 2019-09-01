import { Component, OnInit, Renderer2, Input, ViewChild, ElementRef } from '@angular/core';
import { SpecificRouteTableService } from './specific-route-table.service';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Component({
    selector: 'mr-insert-view-specific-order-view',
    templateUrl: './view-specific-order-view.component.html',
    styleUrls: ['./view-specific-order-view.component.scss']
})
export class ViewSpecificOrderViewComponent implements OnInit {

    @Input() orders: IOrderDetails[];
    @Input() uniqueProducts: IProductOrderDetails[];
    @ViewChild('tableDiv') tableDiv: ElementRef;
    table;

    constructor(
        private specificRouteTable: SpecificRouteTableService,
        private renderer: Renderer2
    ) {
        specificRouteTable.renderer = renderer;
    }

    ngOnInit() {
        // console.log('Here are the view orders:', this.orders);
        this.insertSpecificRouteTable();
    }

    insertSpecificRouteTable() {
        this.table = this.specificRouteTable.createSpecificRouteTable(this.orders, this.uniqueProducts);
        this.tableDiv.nativeElement.appendChild(this.table);
    }
}
