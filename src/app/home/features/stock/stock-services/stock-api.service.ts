import { Injectable } from '@angular/core';

import { UrlsService } from '../../../core/urls.service';
import { HttpClient } from '@angular/common/http';
import { ProcessedStockProducts } from './Stock';


@Injectable({
  providedIn: 'root'
})
export class StockAPIService {

    constructor(private http: HttpClient, private urlService: UrlsService) { }

    private productsUrl = this.urlService.rootUrl + 'api/products/';

    getProducts() {
        return this.http.get<any>(this.productsUrl);
    }

    getTimedStock(time: String) {
        const timeUrl = this.productsUrl + time;
        return this.http.get<any>(timeUrl);
    }

    getHardcodedStock(): ProcessedStockProducts[] {
        const procStock: ProcessedStockProducts[] = [];
        const SV1: ProcessedStockProducts = {product: 'SV1', mainContainer: [
                {container: 'Box', amount: ['3', '4', '7 * 9', '5']},
                {container: 'Bag', amount: ['1', '2']},
                {container: 'Crate', amount: ['6', '7', '8 * 9']}
            ]};
        const RV1: ProcessedStockProducts = {product: 'RV1', mainContainer: [
                {container: 'Box', amount: ['3']},
                {container: 'Trolley', amount: ['1', '2', '3 * 4', '5']},
                {container: 'Crate', amount: ['6', '9*9']}
            ]};
        const SG2: ProcessedStockProducts = {product: 'SG2', mainContainer: [
                {container: 'Box', amount: ['3', '4', '7 * 9', '22', '9*9', '6*6']},
                {container: 'Bag', amount: ['1', '2', '3 * 4', '5']},
                {container: 'Crate', amount: ['6', '7', '1']},
                {container: 'Bulkbag', amount: ['5*5', '2*5']}
            ]};
        procStock.push(SV1, RV1, SG2);
        return procStock;
    }

    getProductContainers(): any {
        const prodContainers = [
        {name: 'SV1', containers: ['Box', 'Bag', 'Crate']},
        {name: 'RV1', containers: ['Box', 'Trolley', 'Crate', 'Bulkbag']},
        {name: 'SG2', containers: ['Box', 'Bag', 'Crate', 'Bulkbag']}
        ];
        return prodContainers;
    }
}
