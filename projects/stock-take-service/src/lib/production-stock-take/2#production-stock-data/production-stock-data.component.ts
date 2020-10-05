import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductionStockMock } from 'src/assets/mockData/stock-take-service/production-data-mocks';
import { IProductionStock, IProductionStockByFactoryArea } from '../../#shared-services/production-stock.interface';
import { ProductionStockService } from '../1#product-stock-services/production-stock.service';

@Component({
    selector: 'stock-production-stock-data',
    templateUrl: './production-stock-data.component.html',
    styleUrls: ['./production-stock-data.component.scss']
})
export class ProductionStockDataComponent implements OnInit {

    productionStock$: Observable<IProductionStockByFactoryArea[]>;
    productionStock: IProductionStockByFactoryArea[];
    noDataMessage = "No data found ..."
    errorMessage: string;

    constructor(private productionStockService: ProductionStockService) { }

    ngOnInit(): void {
        this.getProductionStock()
    }

    getProductionStock() {
        this.errorMessage = ''
        this.productionStock$ = this.productionStockService.getAllProducts().pipe(
            tap(data => this.productionStock = data),
            catchError( (err: any) => {
                // Wait a turn because errorMessage already set once this turn
                setTimeout(() => this.errorMessage = err.message || err.toString());
                // return of(this.noDataMessage); // reset message to placeholder
                return of([]); // reset message to placeholder
              })
        );
    }

}
