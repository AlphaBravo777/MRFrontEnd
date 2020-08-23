import { Component, OnInit, Renderer2, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SpecificRouteTableService } from '../1#view-specific-order-services/specific-route-table.service';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IUniqueProductTotals } from 'src/app/home/shared/services/productServices/products-interface';
import { ViewSpecificOrderService } from '../1#view-specific-order-services/view-specific-order.service';
import { IViewRoutesData } from '../../view-orders/1#view-order-services/view-order-interface';

@Component({
    selector: 'mr-insert-view-specific-order-view',
    templateUrl: './view-specific-order-view.component.html',
    styleUrls: ['./view-specific-order-view.component.scss']
})
export class ViewSpecificOrderViewComponent implements OnInit, AfterViewInit {

    @Input() orders: IOrderDetails[];
    @Input() uniqueProductsDetails: Set<IUniqueProductTotals>;
    @Input() currentRoute: IViewRoutesData;
    @ViewChild('tableDiv', {static: true}) tableDiv: ElementRef;
    totalRouteWeight = 0;
    totalRouteWeightWithCrates = 0;
    table: HTMLTableElement;
    maxShopLength = 0;

    constructor(
        private specificRouteTable: SpecificRouteTableService,
        private viewSpecificOrderService: ViewSpecificOrderService,
        private renderer: Renderer2
    ) {
        specificRouteTable.renderer = renderer;
    }

    ngOnInit() {
        console.log('The current route = ', this.currentRoute);
        this.insertSpecificRouteTable();
    }

    insertSpecificRouteTable() {
        const returnTableArray = this.specificRouteTable.createTableArray(this.orders, this.uniqueProductsDetails);
        const returnTable = this.specificRouteTable.createSpecificRouteTable2(returnTableArray);
        this.table = returnTable;
        this.maxShopLength = this.specificRouteTable.calculateLongestHeading(returnTableArray);
        this.tableDiv.nativeElement.appendChild(this.table);
    }

    onClick(event) {
        console.log('I am listening2');
    }

    dropDownTableState(event, key) {
        console.log(event, key);
    }

    ngAfterViewInit() {
        console.log('Here is the element: ', this.tableDiv.nativeElement);
        this.tableDiv.nativeElement.children[0].children[0].style.height = Math.max(this.maxShopLength * 9.5, 190) + 'px';
    }
}
