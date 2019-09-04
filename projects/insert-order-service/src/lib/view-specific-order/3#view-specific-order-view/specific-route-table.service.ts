import { Injectable, Renderer2 } from '@angular/core';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IUniqueProductsDetails } from 'src/app/home/shared/services/productServices/products-interface';


@Injectable({
    providedIn: 'root'
})
export class SpecificRouteTableService {
    renderer: Renderer2;
    table;
    shopDictionary: Object = {};
    maxShopNameLength = 0;

    constructor() {}

    createSpecificRouteTable(orders: IOrderDetails[], uniqueProductsDetails: IUniqueProductsDetails) {
        this.maxShopNameLength = 0;
        this.createTable(orders, uniqueProductsDetails);
        return [this.table, this.maxShopNameLength];
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

    private createTable(orders: IOrderDetails[], uniqueProductsDetails: IUniqueProductsDetails) {
        this.table = this.renderer.createElement('table');
        this.renderer.addClass(this.table, 'mainTable');
        this.createHeadingTrack(orders);
        this.insertUniqueProductsColumn(uniqueProductsDetails);
        this.insertInitialZeroValueForAllProducts(orders.length, uniqueProductsDetails.uniqueProducts);
        this.insertProductValues(orders, uniqueProductsDetails.productRowValues);
        this.insertShopTotalWeightAmount(orders);
        this.insertUniqueProductAmountTotals(uniqueProductsDetails);
        this.insertUniqueProductWeightTotals(uniqueProductsDetails);
    }

    private createHeadingTrack(orders: IOrderDetails[]) {
        const tr = this.renderer.createElement('tr');
        tr.appendChild(this.createRowColmDivSpanValue(
            'th', undefined, 'productHeading', undefined, 'Products').children[0]);
        let counter = 1;
        orders.forEach(order => {
            tr.appendChild(this.createRowColmDivSpanValue(
                'th', 'shopNames', undefined, undefined, order.commonName).children[0]);
            this.shopDictionary[order.orderid] = counter;
            counter += 1;
            this.maxShopNameLength = order.commonName.length > this.maxShopNameLength ? order.commonName.length : this.maxShopNameLength;
        });
        this.table.appendChild(tr);
    }

    private insertUniqueProductsColumn(uniqueProductsDetails: IUniqueProductsDetails) {
        let counter = 1;
        for (const [key, value] of Object.entries(uniqueProductsDetails.uniqueProducts)) {
            // if you want to sort the productNames first before entering, then you can maybe turn the
            // object first into an array with "newArray = Array.from(object)""
            this.table.appendChild(this.createRowColmDivSpanValue(
                'td', 'prodNames', undefined, undefined, value));
            uniqueProductsDetails.productRowValues[key] = counter;
            counter += 1;
        }
    }

    private insertInitialZeroValueForAllProducts(numberOfOrders: number, uniqueProducts: Set<Object>) {
        const numberOfProducts = Object.keys(uniqueProducts).length;
        console.log('Values = ', numberOfOrders, numberOfProducts);
        for (let row = 1; row < numberOfProducts + 1; row++) {
            for (let col = 0; col < numberOfOrders; col++) {
                this.table.rows[row].appendChild(this.createRowColmDivSpanValue(
                    'td', 'prodAmounts', undefined, undefined, '0').children[0]);
            }
        }
    }

    private insertProductValues(orders: IOrderDetails[], uniqueProductRows: Set<Object>) {
        console.log('Dictionary : ', this.shopDictionary);
        for (let order = 0; order < orders.length; order++) {
            const shopNumber = this.shopDictionary[orders[order].orderid];
            for (let prod = 0; prod < orders[order].orders.length; prod++) {
                const prodNumber = uniqueProductRows[orders[order].orders[prod].productid];
                this.table.rows[prodNumber].cells[shopNumber].innerHTML = orders[order].orders[prod].amount;
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
        Object.entries(uniqueProductsDetails.productTotalAmounts).forEach(
            ([key, value]) => {
                const rowNumber = uniqueProductsDetails.productRowValues[key];
                console.log(key, value, rowNumber);
                this.table.rows[rowNumber].appendChild(this.createRowColmDivSpanValue(
                    'td', undefined, 'prodTotAmount', undefined, value).children[0]);
            }
          );
    }

    private insertUniqueProductWeightTotals(uniqueProductsDetails: IUniqueProductsDetails) {
        this.table.rows[0].appendChild(this.createRowColmDivSpanValue(
            'th', 'shopNames', undefined, undefined, 'Product Weights').children[0]);
        Object.entries(uniqueProductsDetails.productTotalWeights).forEach(
            ([key, value]) => {
                const rowNumber = uniqueProductsDetails.productRowValues[key];
                console.log(key, value, rowNumber);
                this.table.rows[rowNumber].appendChild(this.createRowColmDivSpanValue(
                    'td', 'weightTotals', undefined, undefined, value).children[0]);
            }
          );
    }

}
