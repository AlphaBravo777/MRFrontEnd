import { Injectable, Renderer2 } from '@angular/core';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';


@Injectable({
    providedIn: 'root'
})
export class SpecificRouteTableService {
    renderer: Renderer2;
    table;

    constructor() {}

    createSpecificRouteTable(orders: IOrderDetails[], uniqueProducts: IProductOrderDetails[]) {
        this.createTable(orders, uniqueProducts);

        return this.table;
    }

    private createTable(orders: IOrderDetails[], uniqueProducts: IProductOrderDetails[]) {
        this.table = this.renderer.createElement('table');
        this.createHeadingTrack(orders);
        this.insertUniqueProducts(uniqueProducts);

    }

    private createHeadingTrack(orders: IOrderDetails[]) {
        const tr = this.renderer.createElement('tr');
        const thProd = this.renderer.createElement('th');
        const divProd = this.renderer.createElement('div');
        const prod = this.renderer.createText('Products');
        divProd.appendChild(prod);
        thProd.appendChild(divProd);
        tr.appendChild(thProd);
        this.renderer.addClass(thProd, 'shopNames');
        orders.forEach(order => {
            const th1 = this.renderer.createElement('th');
            const div1 = this.renderer.createElement('div');
            const text1 = this.renderer.createText(order.commonName);
            div1.appendChild(text1);
            th1.appendChild(div1);
            // td1.addClass('headingTrack');
            tr.appendChild(th1);
            this.renderer.addClass(th1, 'shopNames');
        });
        this.table.appendChild(tr);
    }

    insertUniqueProducts(products: IProductOrderDetails[]) {
        products.forEach(product => {
            const tr = this.renderer.createElement('tr');
            const tdProd = this.renderer.createElement('td');
            const text = this.renderer.createText(product.productMRid);
            this.renderer.addClass(tdProd, 'prodNames');
            tdProd.appendChild(text);
            tr.appendChild(tdProd);
            this.table.appendChild(tr);
        });
    }
}
