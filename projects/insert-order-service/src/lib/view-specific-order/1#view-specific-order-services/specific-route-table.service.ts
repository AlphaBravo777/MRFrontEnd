import { Injectable, Renderer2 } from '@angular/core';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IUniqueProductsDetails, IUniqueProductTotals } from 'src/app/home/shared/services/productServices/products-interface';
import { InsertOrderData$Service } from '../../insert-order/1#insert-order-services/insert-order-data$.service';
import { OrderService } from '../../#sharedServices/order.service';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IRow } from './table.interface';

@Injectable({
    providedIn: 'root'
})
export class SpecificRouteTableService {
    renderer: Renderer2;
    private table: HTMLTableElement;
    // private shopDictionary: Object = {};
    // private maxShopNameLength = 0;
    // productsTableArray: IRow[] = [];

    constructor(private insertOrderData$Service: InsertOrderData$Service,
        private orderService: OrderService,
        private router: Router) {}

    createSpecificRouteTable2(productsTableArray: IRow[]): HTMLTableElement {
        this.table = <HTMLTableElement> this.renderer.createElement('table');
        this.renderer.addClass(this.table, 'mainTable');
        const headingtr = this.renderer.createElement('tr');
        let counter = 0;
        for (const element of productsTableArray[0].element) {
            headingtr.appendChild(this.createRowColmDivSpanValue(
                productsTableArray[0].colmString, productsTableArray[0].classColmString, element.classDivString, element.classSpanString, element.value).children[0]);
            headingtr.children[counter].onclick = () => { this.onClick(element.accountid); };
            counter ++;
        }
        this.table.appendChild(headingtr);

        for (const row of productsTableArray.slice(1)) {
            const prodtr = this.renderer.createElement('tr');
            for (const element of row.element) {
                prodtr.appendChild(this.createRowColmDivSpanValue(
                    row.colmString, row.classColmString, element.classDivString, element.classSpanString, element.value).children[0]);
                    this.table.appendChild(prodtr);
                }
        this.table.appendChild(prodtr);
        }
        return this.table;
    }

    createTableArray(orders: IOrderDetails[], uniqueProductsDetails: Set<IUniqueProductTotals>): IRow[] {

        const tableArray: IRow[] = [];
        const totalsArray: IRow = {classColmString: 'products', colmString: 'td', element: []};
        const headingDictionary: Object = {};
        const headings: string[] = ['Products', 'Product Amounts', 'Product Weights', 'TOTALS'];

        // Insert first row which is route names
        const routeNames: IRow = {classColmString: 'shopNames', colmString: 'th', element: []};
        routeNames.element.push({value: headings[0], accountid: null, classDivString: 'productHeading', classSpanString: undefined});
        for (const order of orders) {
            routeNames.element.push({value: order.commonName, accountid: order.accountid, classDivString: 'routeName', classSpanString: undefined});
        }
        routeNames.element.push({value: headings[1], accountid: null, classDivString: 'routeName', classSpanString: undefined});
        routeNames.element.push({value: headings[2], accountid: null, classDivString: 'routeName', classSpanString: undefined});
        tableArray.push(routeNames);

        // Create the TOTALS row and the dictionary of the heading indexes
        totalsArray.element.push({classDivString: 'prodNames', accountid: null, classSpanString: 'prodTRow', value: ''});
        for (let num = 0; num < tableArray[0].element.length; num++) {
            const heading = tableArray[0].element[num].value;
            headingDictionary[heading] = num;
            if (num !== 0) {
                totalsArray.element.push({classDivString: 'prodAmounts', accountid: null, classSpanString: 'prodTRow', value: ''});
            }
        }

        // Insert product names
        for (const key in uniqueProductsDetails) {
            if (uniqueProductsDetails.hasOwnProperty(key)) {
                const row: IRow = {classColmString: 'products', colmString: 'td',
                    element: [{value: uniqueProductsDetails[key].productMRid, accountid: null, classDivString: 'prodNames', classSpanString: undefined}]};
                for (const order of orders) {
                    row.element.push({value: '', accountid: null, classDivString: 'prodAmounts', classSpanString: undefined}); // Push placeholders for product values
                }
                row.element.push({value: undefined, accountid: null, classDivString: 'prodAmounts', classSpanString: 'prodTAmounts'}); // Total amounts placeholder
                row.element.push({value: undefined, accountid: null, classDivString: 'prodAmounts', classSpanString: 'prodTWeights'}); // Total weight placeholder
                tableArray.push(row);
            }
        }

        // Insert order totals and total and amount of each line
        for (let ord = 0; ord < orders.length; ord++) {
            const order = orders[ord];
            // Go through the orders products
            for (let pro = 0; pro < order.orders.length; pro++) {
                const product = order.orders[pro];
                // Go through the tables products
                for (let row = 0; row < tableArray.length; row++) {
                    const tableProduct = tableArray[row].element[0].value;
                    if (tableProduct === product.productMRid) {
                        const colm: number = headingDictionary[orders[ord].commonName];
                        const newAmount: number = Number(tableArray[row].element[colm].value) + product.amount;
                        tableArray[row].element[colm].value = newAmount.toString();
                        tableArray[row].element[headingDictionary[headings[1]]].value = uniqueProductsDetails[product.productid].totalAmount.toString();
                        tableArray[row].element[headingDictionary[headings[2]]].value = uniqueProductsDetails[product.productid].totalWeight.toString();
                        break;
                    }
                }
            }
        }

        // Insert route totals
        let finalTotal = 0;
        for (const order of orders) {
            const index = headingDictionary[order.commonName];
            totalsArray.element[index].value = order.orderTotalAmount.toString();
            finalTotal += order.orderTotalAmount;
        }
        totalsArray.element[0].value = headings[3];
        totalsArray.element[totalsArray.element.length - 1].value = finalTotal.toString();
        tableArray.push(totalsArray);
        tableArray.splice(1, 0, totalsArray);

        console.log('Bravo (createTableArray) = ', tableArray);
        return tableArray;
    }

    calculateLongestHeading(productsTableArray: IRow[]): number {
        let longestLength = 0;
        for (const heading of productsTableArray[0].element) {
            longestLength = heading.value.length > longestLength ? heading.value.length : longestLength;
        }
        return longestLength;
    }

    // private createSpecificRouteTable(orders: IOrderDetails[], uniqueProductsDetails: Set<IUniqueProductTotals>): [HTMLTableElement, number] {
    //     this.createTable(orders, uniqueProductsDetails);
    //     return [this.table, this.maxShopNameLength];
    // }

    // private createTable(orders: IOrderDetails[], uniqueProductsDetails: Set<IUniqueProductTotals>) {
    //     this.table = <HTMLTableElement> this.renderer.createElement('table');
    //     this.renderer.addClass(this.table, 'mainTable');
    //     this.createHeadingTrack(orders);
    //     this.insertUniqueProductsColumn(uniqueProductsDetails);
    //     this.insertInitialZeroValueForAllProducts(orders.length, uniqueProductsDetails);
    //     this.insertProductValues(orders, uniqueProductsDetails);
    //     this.insertBottomShopTotalWeightAmount(orders);
    //     this.insertUniqueProductAmountTotals(uniqueProductsDetails);
    //     this.insertUniqueProductWeightTotals(uniqueProductsDetails);
    // }

    private createRowColmDivSpanValue(colmString: string, classColmString: string,
            classDivString: string, classSpanString: string, valueString: string) {
        const tr: HTMLTableElement = this.renderer.createElement('tr');
        const colm: HTMLTableElement = this.renderer.createElement(colmString);
        const div: HTMLTableElement = this.renderer.createElement('div');
        const span: HTMLTableElement = this.renderer.createElement('span');
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

    // private createHeadingTrack(orders: IOrderDetails[]) {
    //     const headingtr = this.renderer.createElement('tr');
    //     headingtr.appendChild(this.createRowColmDivSpanValue(
    //         'th', undefined, 'productHeading', undefined, 'Products').children[0]);
    //     let counter = 1;
    //     orders.forEach(order => {
    //         headingtr.appendChild(this.createRowColmDivSpanValue(
    //             'th', 'shopNames', undefined, undefined, order.commonName).children[0]);
    //         headingtr.children[counter].onclick = () => { this.onClick(order.accountid); };
    //         this.shopDictionary[order.orderid] = counter;
    //         this.maxShopNameLength = order.commonName.length > this.maxShopNameLength ? order.commonName.length : this.maxShopNameLength;
    //         counter += 1;
    //     });
    //     this.table.appendChild(headingtr);
    // }

    private onClick(accountid) {
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

    // private insertUniqueProductsColumn(uniqueProductsDetails: Set<IUniqueProductTotals>) {
    //     let counter = 1;
    //     for (const key in uniqueProductsDetails) {
    //         if (uniqueProductsDetails.hasOwnProperty(key)) {
    //             // if you want to sort the productNames first before entering, then you can maybe turn the
    //             // object first into an array with "newArray = Array.from(object)""
    //             this.table.appendChild(this.createRowColmDivSpanValue(
    //                 'td', 'prodNames', undefined, undefined, uniqueProductsDetails[key].productMRid));
    //             uniqueProductsDetails[key].rowNumber = counter;
    //             counter += 1;
    //         }
    //     }
    // }

    // private insertInitialZeroValueForAllProducts(numberOfOrders: number, uniqueProducts: Set<IUniqueProductTotals>) {
    //     const numberOfProducts = Object.keys(uniqueProducts).length;
    //     for (let row = 1; row < numberOfProducts + 1; row++) {
    //         for (let col = 0; col < numberOfOrders; col++) {
    //             this.table.rows[row].appendChild(this.createRowColmDivSpanValue(
    //                 'td', 'prodAmounts', undefined, undefined, '').children[0]);
    //         }
    //     }
    // }

    // private insertProductValues(orders: IOrderDetails[], uniqueProducts: Set<IUniqueProductTotals>) {
    //     for (let order = 0; order < orders.length; order++) {
    //         const shopNumber = this.shopDictionary[orders[order].orderid];
    //         for (let prod = 0; prod < orders[order].orders.length; prod++) {
    //             const prodRowNumber = uniqueProducts[orders[order].orders[prod].productid].rowNumber;
    //             const currentTableValue = Number(this.table.rows[prodRowNumber].cells[shopNumber].children[0].children[0].innerHTML);
    //             const sumValue = currentTableValue + orders[order].orders[prod].amount;
    //             this.table.rows[prodRowNumber].cells[shopNumber].children[0].children[0].innerHTML = sumValue.toString();
    //         }
    //     }
    // }

    // private insertBottomShopTotalWeightAmount(orders: IOrderDetails[]) {
    //     const totals = this.renderer.createElement('tr');
    //     this.renderer.addClass(totals, 'routeTotals1');
    //     // Set the cell at the bottom that says "TOTALS"
    //     totals.appendChild(this.createRowColmDivSpanValue(
    //         'td', 'divTotals1', undefined, undefined, 'TOTALS').children[0]);
    //     // Set the rest of the cells where each have their shop totals
    //     orders.forEach(order => {
    //         totals.appendChild(this.createRowColmDivSpanValue(
    //             //  There is an error here that is popping up for route "Rust/Brits"
    //             //  This ended up happening if you have no products for a given order
    //             'td', 'weightTotals', undefined, undefined, (order.orderTotalAmount).toString()).children[0]);
    //     });
    //     this.table.appendChild(totals);
    //     // this.table.innerHTML = totals;

    // }

    // private insertUniqueProductAmountTotals(uniqueProductsDetails: IUniqueProductsDetails) {
    //     this.table.rows[0].appendChild(this.createRowColmDivSpanValue(
    //         'th', 'shopNames', undefined, undefined, 'Product Amounts').children[0]);
    //         for (const key in uniqueProductsDetails) {
    //             if (uniqueProductsDetails.hasOwnProperty(key)) {
    //             const rowNumber = uniqueProductsDetails[key].rowNumber;
    //             this.table.rows[rowNumber].appendChild(this.createRowColmDivSpanValue(
    //                 'td', undefined, 'prodTotAmount', undefined, uniqueProductsDetails[key].totalAmount).children[0]);
    //             }
    //         }
    // }

    // private insertUniqueProductWeightTotals(uniqueProductsDetails: IUniqueProductsDetails) {
    //     this.table.rows[0].appendChild(this.createRowColmDivSpanValue(
    //         'th', 'shopNames', undefined, undefined, 'Product Weights').children[0]);
    //     for (const key in uniqueProductsDetails) {
    //         if (uniqueProductsDetails.hasOwnProperty(key)) {
    //         const rowNumber = uniqueProductsDetails[key].rowNumber;
    //         this.table.rows[rowNumber].appendChild(this.createRowColmDivSpanValue(
    //             'td', undefined, 'weightTotals2', undefined, uniqueProductsDetails[key].totalWeight).children[0]);
    //         }
    //     }
    // }

}
