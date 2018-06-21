import { Component, OnInit, Input } from '@angular/core';

import { ProcessedStock, ProcessedGroup } from './../../../stock-services/Stock';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-stock-products',
    templateUrl: './stock-products.component.html',
    styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit {

    private _products = new BehaviorSubject<ProcessedStock[]>([]);
    processedGroup: ProcessedGroup[];

    @Input()
    set products(value) {
        this._products.next(value);
    }
    get products() {
        return this._products.getValue();
    }

    constructor() { }

    ngOnInit() {
        this._products.subscribe(x => {
            this.processedGroup = this.groupByCategory(this.products);
        });
    }

    groupByCategory(product: ProcessedStock[]): ProcessedGroup[] {
        if (!product) {return; }
        const categories = new Set(product.map(x => x.batchGroup));
    }
}

// groupByCategory(data: Post[]): GroupPosts[] {
//     if (!data) return;
//     const categories = new Set(data.map(x => x.category));
//     const result = Array.from(categories).map(x => ({
//         category: x,
//         posts: data.filter(post => post.category === x)
//     }));

//     return result;
// }

