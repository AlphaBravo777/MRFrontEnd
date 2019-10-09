import { Injectable, Renderer2 } from '@angular/core';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IUniqueProductsDetails, IUniqueProductTotals } from 'src/app/home/shared/services/productServices/products-interface';
import { InsertOrderData$Service } from '../../insert-order/1#insert-order-services/insert-order-data$.service';
import { OrderService } from '../../#sharedServices/order.service';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class SpecificRouteTableService {
    renderer: Renderer2;
    private table;
    private shopDictionary: Object = {};
    private maxShopNameLength = 0;

    constructor(private insertOrderData$Service: InsertOrderData$Service,
        private orderService: OrderService,
        private router: Router) {}

    createSpecificRouteTable(orders: IOrderDetails[], uniqueProductsDetails: Set<IUniqueProductTotals>) {
        this.maxShopNameLength = 0;
        this.createTable(orders, uniqueProductsDetails);
        return [this.table, this.maxShopNameLength];
    }

    private createTable(orders: IOrderDetails[], uniqueProductsDetails: Set<IUniqueProductTotals>) {
        this.table = this.renderer.createElement('table');
        this.renderer.addClass(this.table, 'mainTable');
        this.createHeadingTrack(orders);
        this.insertUniqueProductsColumn(uniqueProductsDetails);
        this.insertInitialZeroValueForAllProducts(orders.length, uniqueProductsDetails);
        this.insertProductValues(orders, uniqueProductsDetails);
        this.insertShopTotalWeightAmount(orders);
        this.insertUniqueProductAmountTotals(uniqueProductsDetails);
        this.insertUniqueProductWeightTotals(uniqueProductsDetails);
    }

    private createRowColmDivSpanValue(colmString: string, classColmString: string,
            classDivString: string, classSpanString: string, valueString: string) {
        const tr = this.renderer.createElement('tr');
        const colm = this.renderer.createElement(colmString);
        const div = this.renderer.createElement('div');
        const span = this.renderer.createElement('span');
        const value = this.renderer.createText(valueString);
        span.appendChild(value);
        div.appendChild(span);
        colm.appendChild(div);
        tr.appendChild(colm);
        this.renderer.addClass(span, classSpanString);
        this.renderer.addClass(div, classDivString);
        this.renderer.addClass(colm, classColmString);
        return tr;
}

    private createHeadingTrack(orders: IOrderDetails[]) {
        const tr = this.renderer.createElement('tr');
        tr.appendChild(this.createRowColmDivSpanValue(
            'th', undefined, 'productHeading', undefined, 'Products').children[0]);
        let counter = 1;
        orders.forEach(order => {
            tr.appendChild(this.createRowColmDivSpanValue(
                'th', 'shopNames', undefined, undefined, order.commonName).children[0]);
            tr.children[counter].onclick = () => { this.onClick(order.accountid);};
            this.shopDictionary[order.orderid] = counter;
            counter += 1;
            this.maxShopNameLength = order.commonName.length > this.maxShopNameLength ? order.commonName.length : this.maxShopNameLength;
        });
        this.table.appendChild(tr);
    }

    onClick(accountid) {
        if (accountid !== null) {
            // this.insertOrderData$Service.setWorkingAccount();
            this.orderService.getAccountFromAccountid(accountid).pipe(
                take(1),
                tap(account => console.log('The account = ', account)),
                tap(account => this.insertOrderData$Service.setWorkingAccount(account)),
                tap(() => this.router.navigate(['/main/admin-office/insertOrderService/entry/insert-order']))
            ).subscribe();
        }
    }

    private insertUniqueProductsColumn(uniqueProductsDetails: Set<IUniqueProductTotals>) {
        let counter = 1;
        for (const key in uniqueProductsDetails) {
            if (uniqueProductsDetails.hasOwnProperty(key)) {
                // if you want to sort the productNames first before entering, then you can maybe turn the
                // object first into an array with "newArray = Array.from(object)""
                this.table.appendChild(this.createRowColmDivSpanValue(
                    'td', 'prodNames', undefined, undefined, uniqueProductsDetails[key].productMRid));
                uniqueProductsDetails[key].rowNumber = counter;
                counter += 1;
            }
        }
    }

    private insertInitialZeroValueForAllProducts(numberOfOrders: number, uniqueProducts: Set<IUniqueProductTotals>) {
        const numberOfProducts = Object.keys(uniqueProducts).length;
        for (let row = 1; row < numberOfProducts + 1; row++) {
            for (let col = 0; col < numberOfOrders; col++) {
                this.table.rows[row].appendChild(this.createRowColmDivSpanValue(
                    'td', 'prodAmounts', undefined, undefined, '').children[0]);
            }
        }
    }

    private insertProductValues(orders: IOrderDetails[], uniqueProducts: Set<IUniqueProductTotals>) {
        for (let order = 0; order < orders.length; order++) {
            const shopNumber = this.shopDictionary[orders[order].orderid];
            for (let prod = 0; prod < orders[order].orders.length; prod++) {
                const prodRowNumber = uniqueProducts[orders[order].orders[prod].productid].rowNumber;
                const currentTableValue = Number(this.table.rows[prodRowNumber].cells[shopNumber].children[0].children[0].innerHTML);
                this.table.rows[prodRowNumber].cells[shopNumber].children[0].children[0].innerHTML =
                    currentTableValue + orders[order].orders[prod].amount;
            }
        }
    }

    private insertShopTotalWeightAmount(orders: IOrderDetails[]) {
        const totals = this.renderer.createElement('tr');
        this.renderer.addClass(totals, 'routeTotals1');
        totals.appendChild(this.createRowColmDivSpanValue(
            'td', 'divTotals1', undefined, undefined, 'TOTALS').children[0]);
        orders.forEach(order => {
            totals.appendChild(this.createRowColmDivSpanValue(
                'td', 'weightTotals', undefined, undefined, (order.orderTotalAmount).toString()).children[0]);
        });
        this.table.appendChild(totals);
    }

    private insertUniqueProductAmountTotals(uniqueProductsDetails: IUniqueProductsDetails) {
        this.table.rows[0].appendChild(this.createRowColmDivSpanValue(
            'th', 'shopNames', undefined, undefined, 'Product Amounts').children[0]);
            for (const key in uniqueProductsDetails) {
                if (uniqueProductsDetails.hasOwnProperty(key)) {
                const rowNumber = uniqueProductsDetails[key].rowNumber;
                this.table.rows[rowNumber].appendChild(this.createRowColmDivSpanValue(
                    'td', undefined, 'prodTotAmount', undefined, uniqueProductsDetails[key].totalAmount).children[0]);
                }
            }
    }

    private insertUniqueProductWeightTotals(uniqueProductsDetails: IUniqueProductsDetails) {
        this.table.rows[0].appendChild(this.createRowColmDivSpanValue(
            'th', 'shopNames', undefined, undefined, 'Product Weights').children[0]);
        for (const key in uniqueProductsDetails) {
            if (uniqueProductsDetails.hasOwnProperty(key)) {
            const rowNumber = uniqueProductsDetails[key].rowNumber;
            this.table.rows[rowNumber].appendChild(this.createRowColmDivSpanValue(
                'td', undefined, 'weightTotals2', undefined, uniqueProductsDetails[key].totalWeight).children[0]);
            }
        }
    }

    insertTotalRouteWeight(totalRouteWeight) {
        console.log('Table weigth rows: ', this.table.rows[this.table.rows.length - 1]);
        this.table.rows[this.table.rows.length - 1].appendChild(this.createRowColmDivSpanValue(
            'td', 'weightTotals', undefined, undefined, '_').children[0]);
        this.table.rows[this.table.rows.length - 1].appendChild(this.createRowColmDivSpanValue(
            'td', 'weightTotals', undefined, undefined, totalRouteWeight).children[0]);
    }

}
