import { Component, OnInit, Renderer2, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SpecificRouteTableService } from './specific-route-table.service';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IProductOrderDetails, IUniqueProductsDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Component({
    selector: 'mr-insert-view-specific-order-view',
    templateUrl: './view-specific-order-view.component.html',
    styleUrls: ['./view-specific-order-view.component.scss']
})
export class ViewSpecificOrderViewComponent implements OnInit, AfterViewInit {

    @Input() orders: IOrderDetails[];
    @Input() uniqueProductsDetails: IUniqueProductsDetails;
    // @Input() uniqueProductAmountTotals: Object;
    @ViewChild('tableDiv') tableDiv: ElementRef;
    table;
    maxShopNumber = 0;

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
        const returnTable = this.specificRouteTable.createSpecificRouteTable(
            this.orders, this.uniqueProductsDetails);
        this.table = returnTable[0];
        this.maxShopNumber = returnTable[1];
        this.tableDiv.nativeElement.appendChild(this.table);
        console.log('The maximum number = ', this.maxShopNumber);
    }

    ngAfterViewInit() {
        console.log('Here is the element: ', this.tableDiv.nativeElement);
        this.tableDiv.nativeElement.children[0].children[0].style.height = this.maxShopNumber * 9.5 + 'px';
        // this.tableDiv.nativeElement.children[0].children[0].children[0].children[0].style.height = this.maxShopNumber * 9.5 - 10 + 'px';
    }
}
