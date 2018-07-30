import { Injectable } from '@angular/core';

import { UrlsService } from '../../../core/urls.service';
import { HttpClient } from '@angular/common/http';
import { IProcessedStockProducts, IRawProcessedStock, IProductContainers, IProductDetails, IContainerGroups } from './Stock';
import { Observable } from '../../../../../../node_modules/rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockAPIService {

    constructor(private http: HttpClient, private urlService: UrlsService) { }

    private productsUrl = this.urlService.rootUrl + 'api/products/';

    getProducts(): Observable<IProductDetails[]> {
        return this.http.get<IProductDetails[]>(this.productsUrl);
    }

    getTimedStock(time: String): Observable<IRawProcessedStock[]> {
        const timeUrl = this.productsUrl + time;
        return this.http.get<IRawProcessedStock[]>(timeUrl);
    }

    getProductContainers(): Observable<IProductContainers[]> {
        const timeUrl = this.productsUrl + 'containers';
        return this.http.get<IProductContainers[]>(timeUrl);
    }



    getHardcodedStock(): IProcessedStockProducts[] {
        const procStock: IProcessedStockProducts[] = [];
        const SV1: IProcessedStockProducts = {product: 'SV1', mainContainer: [
                {container: 'Box', amount: ['3', '4', '7 * 9', '5']},
                {container: 'Bulk Bags', amount: ['1', '2']},
                {container: 'Crate', amount: ['6', '7', '8 * 9']}
            ]};
        const RV1: IProcessedStockProducts = {product: 'RV1', mainContainer: [
                {container: 'Box', amount: ['3']},
                {container: 'Pasturised', amount: ['1', '2', '3 * 4', '5']},
                {container: 'Bulk Bags', amount: ['6', '9*9']}
            ]};
        const SG2: IProcessedStockProducts = {product: 'SG2', mainContainer: [
                {container: 'Box', amount: ['3', '4', '7 * 9', '22', '9*9', '6*6']},
                {container: 'Bulk Bags', amount: ['1', '2', '3 * 4', '5']},
                {container: 'Crate', amount: ['6', '7', '1']},
                {container: 'Lugs', amount: ['5*5', '2*5']}
            ]};
        procStock.push(SV1, RV1, SG2);
        return procStock;
    }

    getHardcodedProductContainers(): IContainerGroups[] {
        const prodContainers = [
        {name: 'SV1', containers: ['Box', 'Bulk Bags', 'Crate']},
        {name: 'RV1', containers: ['Box', 'Pasturised', 'Crate', 'Bulk Bags']},
        {name: 'SG2', containers: ['Box', 'Bulk Bags', 'Crate', 'Lugs']}
        ];
        return prodContainers;
    }
}
