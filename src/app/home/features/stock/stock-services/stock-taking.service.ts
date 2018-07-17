import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlsService } from '../../../core/urls.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class StockTakingService {

    constructor(private http: HttpClient, private _urlService: UrlsService, private router: Router) { }

    private productsUrl = this._urlService.rootUrl + 'api/products/';

    sendProcessedProducts() {
        const finalArray  = [];
        const time = JSON.parse(localStorage.getItem('stocktime'));
        const stock = JSON.parse(localStorage.getItem('stock'));
        for (const key in stock) {
            if (stock.hasOwnProperty(key)) {
                const array = stock[key].split(',');
                for (let a = 0; a < array.length; ++a) {
                    const product = {'prodName': key, 'amount': array[a], 'time': time};
                    finalArray.push(product);
                }
            }
        }
        this.deleteAllTimeProcessedStock(time).subscribe(x => {
            if (!x) {
                // console.log('Order success');
                this.router.navigate(['user/user-nav/']);
            }
        });
        console.log(finalArray);
        return this.http.post<any>(this.productsUrl + 'input/', finalArray);
    }

    deleteAllTimeProcessedStock(time: String) {
        const timeUrl = this.productsUrl + 'delete/' + time;
        return this.http.delete<any>(timeUrl);
    }
}


        // const product = [
        //         {'id': 1, 'prodName': 'SV1', 'amount': '22', 'time' : '06:00:00'},
        //         {'id': 2, 'prodName': 'RV1', 'amount': '2222222', 'time' : '06:00:00'},
        //         {'id': 3, 'prodName': 'RV1', 'amount': '3333333', 'time' : '06:00:00'},
        //     ];
