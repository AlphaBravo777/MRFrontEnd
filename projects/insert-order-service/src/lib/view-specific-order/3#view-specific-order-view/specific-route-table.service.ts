import { Injectable, Renderer2 } from '@angular/core';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';


@Injectable({
    providedIn: 'root'
})
export class SpecificRouteTableService {
    renderer: Renderer2;
    table;
    shopDictionary: Object = {};
    productDictionary: Object = {};
    maxShopNameLength = 0;

    constructor() {}

    createSpecificRouteTable(orders: IOrderDetails[], uniqueProducts: IProductOrderDetails[]) {
        this.maxShopNameLength = 0;
        this.createTable(orders, uniqueProducts);

        return [this.table, this.maxShopNameLength];
    }

    private createTable(orders: IOrderDetails[], uniqueProducts: IProductOrderDetails[]) {
        this.table = this.renderer.createElement('table');
        this.renderer.addClass(this.table, 'mainTable');
        this.createHeadingTrack(orders);
        this.insertUniqueProductsColumn(uniqueProducts);
        this.insertInitialZeroValueForAllProducts(orders.length, uniqueProducts.length);
        this.insertProductValues(orders);
    }

    private createHeadingTrack(orders: IOrderDetails[]) {
        const tr = this.renderer.createElement('tr');
        const thProd = this.renderer.createElement('th');
        const divProd = this.renderer.createElement('div');
        const spanProd = this.renderer.createElement('span');
        const prod = this.renderer.createText('Products');
        spanProd.appendChild(prod);
        divProd.appendChild(spanProd);
        thProd.appendChild(divProd);
        tr.appendChild(thProd);
        this.renderer.addClass(divProd, 'productHeading');
        let counter = 1;
        orders.forEach(order => {
            const spanShop = this.renderer.createElement('span');
            const thShop = this.renderer.createElement('th');
            const divShop = this.renderer.createElement('div');
            const textShop = this.renderer.createText(order.commonName);
            spanShop.appendChild(textShop);
            divShop.appendChild(spanShop);
            thShop.appendChild(divShop);
            tr.appendChild(thShop);
            this.renderer.addClass(thShop, 'shopNames');
            this.shopDictionary[order.accountid] = counter;
            counter += 1;
            this.maxShopNameLength = order.commonName.length > this.maxShopNameLength ? order.commonName.length : this.maxShopNameLength;
        });
        this.table.appendChild(tr);
    }

    insertUniqueProductsColumn(products: IProductOrderDetails[]) {
        let counter = 1;
        products.forEach(product => {
            const tr = this.renderer.createElement('tr');
            const tdProd = this.renderer.createElement('td');
            const text = this.renderer.createText(product.productMRid);
            this.renderer.addClass(tdProd, 'prodNames');
            tdProd.appendChild(text);
            tr.appendChild(tdProd);
            this.table.appendChild(tr);
            this.productDictionary[product.productid] = counter;
            counter += 1;
        });
    }

    insertInitialZeroValueForAllProducts(numberOfOrders: number, numberOfProducts: number) {
        console.log('Values = ', numberOfOrders, numberOfProducts);
        for (let row = 1; row < numberOfProducts + 1; row++) {
            for (let col = 0; col < numberOfOrders; col++) {
                const td = this.renderer.createElement('td');
                const value = this.renderer.createText('0');
                this.renderer.addClass(td, 'prodAmounts');
                td.appendChild(value);
                this.table.rows[row].appendChild(td);

            }
        }
    }

    insertProductValues(orders: IOrderDetails[]) {
        console.log('Dictionary : ', this.shopDictionary);
        for (let order = 0; order < orders.length; order++) {
            const shopNumber = this.shopDictionary[orders[order].accountid];
            for (let prod = 0; prod < orders[order].orders.length; prod++) {
                const prodNumber = this.productDictionary[orders[order].orders[prod].productid];
                this.table.rows[prodNumber].cells[shopNumber].innerHTML = orders[order].orders[prod].amount;
            }
        }
    }

}
