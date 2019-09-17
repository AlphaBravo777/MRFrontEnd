import { Component, OnInit, Renderer2, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SpecificRouteTableService } from './specific-route-table.service';
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
    @ViewChild('tableDiv') tableDiv: ElementRef;
    totalRouteWeight = 0;
    totalRouteWeightWithCrates = 0;
    table;
    maxShopNumber = 0;

    constructor(
        private specificRouteTable: SpecificRouteTableService,
        private viewSpecificOrderService: ViewSpecificOrderService,
        private renderer: Renderer2
    ) {
        specificRouteTable.renderer = renderer;
    }

    ngOnInit() {
        this.insertSpecificRouteTable();
        this.calculateRouteExternalDetails();
    }

    insertSpecificRouteTable() {
        const returnTable = this.specificRouteTable.createSpecificRouteTable(
            this.orders, this.uniqueProductsDetails);
        this.table = returnTable[0];
        this.maxShopNumber = returnTable[1];
        this.tableDiv.nativeElement.appendChild(this.table);
    }

    calculateRouteExternalDetails() {
        const returnedWeights: Array<any> =
            this.viewSpecificOrderService.calculateRouteWeightWithAndWithoutWeight(this.uniqueProductsDetails);
        this.totalRouteWeight = returnedWeights[0];
        this.totalRouteWeightWithCrates = returnedWeights[1];
        this.specificRouteTable.insertTotalRouteWeight(this.totalRouteWeight);
    }

    dropDownTableState(event, key) {
        console.log(event, key);
    }

    ngAfterViewInit() {
        console.log('Here is the element: ', this.tableDiv.nativeElement);
        this.tableDiv.nativeElement.children[0].children[0].style.height = Math.max(this.maxShopNumber * 9.5, 190) + 'px';
    }
}
