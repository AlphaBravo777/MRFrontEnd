import { Injectable } from '@angular/core';
import { HppSummaryApiService } from './hpp-summary-api.service';
import { Observable, combineLatest } from 'rxjs';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { concatMap } from 'rxjs/operators';
import { select } from 'async';

@Injectable({
    providedIn: 'root'
})
export class HppSummaryService {

    constructor(private hppSummaryApiService: HppSummaryApiService, private getDate: GetDate$Service) {}

    getHppStartingData(datePackage: IDate): Observable<any> {
        return combineLatest([
            this.getPnpProducts(),
            this.getMeatriteStock(),
            this.getPreHppStock(datePackage),
            this.getPnPOrder(datePackage),
            this.getOutstandingPnPOrders(datePackage),
            this.getPostHppStock(datePackage),
            this.getHppLeakers()
        ]);
    }

    // pnpProducts
    // meatriteProducts
    // preHppProducts
    // pnpOrders
    // oustandingPnPOrders + number
    // postHppProducts
    // hppLeakers

    getPnpProducts(): Observable<any> {
        return this.hppSummaryApiService.getPnpProducts().pipe();
    }

    getMeatriteStock(): Observable<any> {
        return this.hppSummaryApiService.getMeatriteStock().pipe();
    }

    getPreHppStock(datePackage: IDate): Observable<any> {
        return this.hppSummaryApiService.getPreHppStock(datePackage).pipe();
    }

    getPostHppStock(datePackage: IDate): Observable<any> {
        return this.hppSummaryApiService.getPostHppStock(datePackage).pipe();
    }

    getPnPOrder(datePackage: IDate): Observable<any> {
        return this.hppSummaryApiService.getPnPOrder(datePackage).pipe();
    }

    getOutstandingPnPOrders(datePackage: IDate): Observable<any> {
        return this.hppSummaryApiService.getOutstandingPnPOrders(datePackage).pipe();
    }

    getHppLeakers(): Observable<any> {
        return this.hppSummaryApiService.getHppLeakers().pipe();
    }

    getOutstandingStock(pnpProducts, meatriteStock, preHppStock, pnpOrder, postHppStock, hppLeakers, amountOfOrders, outstandingOrders) {
        const outstandingStock = [];
        for (let pnp = 0; pnp < pnpProducts.length; pnp++) {
            outstandingStock.push({productid: pnpProducts[pnp].productid});
        }
        for (let out = 0; out < outstandingStock.length; out++) {
            for (let postHpp = 0; postHpp < postHppStock.length; postHpp++) {
                if (outstandingStock[out].productid === postHppStock[postHpp].productid) {
                    outstandingStock[out].postHpp = postHppStock[postHpp].stockTotal;
                }
            }
            for (let preHpp = 0; preHpp < preHppStock.length; preHpp++) {
                if (outstandingStock[out].productid === preHppStock[preHpp].productid) {
                    outstandingStock[out].preHpp = preHppStock[preHpp].stockTotal;
                }
            }
            for (let mr = 0; mr < meatriteStock.length; mr++) {
                if (outstandingStock[out].productid === meatriteStock[mr].productid) {
                    outstandingStock[out].mrStock = meatriteStock[mr].stockTotal;
                }
            }
            for (let order = 0; order < pnpOrder.length; order++) {
                if (outstandingStock[out].productid === pnpOrder[order].productid) {
                    outstandingStock[out].pnpOrder = pnpOrder[order].amount;
                }
            }
            for (let leak = 0; leak < hppLeakers.length; leak++) {
                if (outstandingStock[out].productid === hppLeakers[leak].productid) {
                    outstandingStock[out].leakers = hppLeakers[leak].stockTotal;
                }
            }
            for (let outOrder = 0; outOrder < outstandingOrders.length; outOrder++) {
                if (outstandingStock[out].productid === outstandingOrders[outOrder].productid) {
                    outstandingStock[out].outOrders = outstandingOrders[outOrder].stockTotal;
                }
            }
        }
        console.log('* * * ', outstandingStock);
        for (let pnp = 0; pnp < outstandingStock.length; pnp++) {
            switch (amountOfOrders) {
                case undefined:
                console.log
                ('* * * * * *  The "getOutstandingStock" function failed with calculating the amount of orders * * * * * * * ');
                break;
                case 0:
                    console.log('This is the current day');
                    outstandingStock[pnp].amount = outstandingStock[pnp].postHpp - outstandingStock[pnp].pnpOrder;
                    if (outstandingStock[pnp].amount > 0) {
                        outstandingStock[pnp].amount = 0;
                    }
                break;
                case 1:
                    console.log('This is the next day');
                    outstandingStock[pnp].amount = outstandingStock[pnp].postHpp + outstandingStock[pnp].preHpp -
                    outstandingStock[pnp].outOrders - outstandingStock[pnp].pnpOrder;
                    if (outstandingStock[pnp].amount > 0) {
                        outstandingStock[pnp].amount = 0;
                    }
                break;
                default:
                    console.log('This is day 2 or more');
                    outstandingStock[pnp].amount = outstandingStock[pnp].postHpp + outstandingStock[pnp].preHpp +
                    outstandingStock[pnp].mrStock - outstandingStock[pnp].outOrders - outstandingStock[pnp].pnpOrder;
                    if (outstandingStock[pnp].amount > 0) {
                        outstandingStock[pnp].amount = 0;
                    }
            }
        }
        return outstandingStock;
    }

}
