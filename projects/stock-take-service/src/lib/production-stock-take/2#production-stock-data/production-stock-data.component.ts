import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductionStockMock } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IProductionStock } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../1#product-stock-services/production-stock.service';

@Component({
    selector: 'stock-production-stock-data',
    templateUrl: './production-stock-data.component.html',
    styleUrls: ['./production-stock-data.component.scss']
})
export class ProductionStockDataComponent implements OnInit {

    productionStock$: Observable<IProductionStock[]>;
    productionStock: IProductionStock[] = [];

    constructor(private productionStockService: ProductionStockService) { }

    ngOnInit(): void {
        this.productionStock$ = this.productionStockService.getAllProducts().pipe(
            tap(data => this.productionStock = data)
        );
        // this.getProductionStock();
        // const data: IProductionStock = ProductionStockMock.build();
        // console.log('Here is the data: ', data);
    }

    // getProductionStock() {
    //     this.productionStock$ = this.productionStockService.getAllProducts();
    // }

    testOb() {
        this.productionStock$.subscribe(
            data => this.productionStock = data
        )
    }

}
