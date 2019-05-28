import { Injectable } from '@angular/core';
import { PnpSharedApiService } from './pnp-shared-api.service';
import { GetDate$Service } from '../../main-portal/date-picker/date-picker-service/get-date$.service';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { IPnPOrderProduct, IPnPOrder, IPnPOrderMatrix, IPnPOrderTotals } from './pnp-shared-interfaces';
import { ToolboxGroupService } from '../toolbox/toolbox-group.service';

@Injectable({
    providedIn: 'root'
})
export class PnpSharedService {

    constructor(private pnpSharedApiService: PnpSharedApiService,
        private getDateService: GetDate$Service,
        private toolBoxService: ToolboxGroupService) {}

    getAllPnPProductsThatAreActive(): Observable<IPnPOrderProduct[]> {
        return this.pnpSharedApiService.getAllPnPProductsThatAreActive().pipe(
            map(data => this.toolBoxService.sorting(data, 'rankingInGroup')),
            tap(data => console.log('All active PnP products = ', data))
        );
    }

    addPnPRegionsDeliAndPremiumOrderTogether(orders: IPnPOrder[]): Observable<IPnPOrder[]> {
        const newOrderArray: IPnPOrder[] = [];
        for (let order = 0; order < orders.length; order++) {
            let orderNotFound = true;
            for (let newOrder = 0; newOrder < newOrderArray.length; newOrder++) {
                if (orders[order].accountID === newOrderArray[newOrder].accountID) {
                    newOrderArray[newOrder].products.push.apply(newOrderArray[newOrder].products, orders[order].products);
                    orderNotFound = false;
                    break;
                }
            }
            if (orderNotFound) {
                newOrderArray.push(orders[order]);
                newOrderArray[newOrderArray.length - 1].commonName =
                    orders[order].commonName.substr(0, orders[order].commonName.indexOf(' '));
            }
        }
        console.log('The new Order array = ', newOrderArray);
        return of(newOrderArray);
    }

    calculateTotalPnPOrderWeightForDate(orders?: IPnPOrder[]): Observable<IPnPOrderTotals> {

        const addProductWeightsTogether = (workingOrders: IPnPOrder[]): Observable<IPnPOrderTotals> => {
            let pnpOrderTotalWeight = 0;
            let pnpOrderTotalLugs = 0;

            for (let order = 0; order < workingOrders.length; order++) {
                for (let product = 0; product < workingOrders[order].products.length; product++) {
                    const productWeight = workingOrders[order].products[product].amount *
                        workingOrders[order].products[product].packageWeight;
                    pnpOrderTotalWeight = pnpOrderTotalWeight + productWeight;
                    pnpOrderTotalLugs = pnpOrderTotalLugs + workingOrders[order].products[product].amount;
                }
            }
            console.log('The total number of pnp Lugs are: ', pnpOrderTotalLugs);
            return of({pnpOrderTotalWeight: pnpOrderTotalWeight, pnpOrderTotalLugs: pnpOrderTotalLugs});
        };

        if (orders) {
            return addProductWeightsTogether(orders);
        } else {
            return this.getSelectedDayPnPOrders().pipe(
                switchMap(newlyFetchedOrders => addProductWeightsTogether(newlyFetchedOrders))
            );
        }
    }

    createPnPRegionsAndProductsMatrix(orders?: IPnPOrder[]): Observable<any> {

        const pnpRegionsAndProductsMatrix = (workingOrders: IPnPOrder[]): Observable<any> => {
            const pnpOrderMatrix: IPnPOrderMatrix = {regions: [], products: []};

            const createPnPMatrix = (pnpActiveProducts: IPnPOrderProduct[], pnpOrders: IPnPOrder[], pnpProductTotals) => {

                const enterLine = (title: String, productList: IPnPOrderProduct[]) => {
                    pnpOrderMatrix.regions.push(title);
                    for (let actProd = 0; actProd < pnpOrderMatrix.products.length; actProd++) {
                        let productNotFound = true;
                        for (let product = 0; product < productList.length; product++) {
                            if (productList[product].productid === pnpOrderMatrix.products[actProd].productName.productid) {
                                pnpOrderMatrix.products[actProd].productAmounts.push(productList[product].amount);
                                productNotFound = false;
                            }
                        }
                        if (productNotFound) {
                            pnpOrderMatrix.products[actProd].productAmounts.push(0);
                        }

                    }
                };

                pnpOrderMatrix.regions.push('Products');
                for (let actProd = 0; actProd < pnpActiveProducts.length; actProd++) {
                    pnpOrderMatrix.products.push({productName: pnpActiveProducts[actProd], productAmounts: []});
                }
                for (let order = 0; order < pnpOrders.length; order++) {
                    enterLine(pnpOrders[order].commonName, pnpOrders[order].products);
                }
                enterLine('Totals', pnpProductTotals);
                return pnpOrderMatrix;
            };

            const allPnPActiveProducts$ = this.getAllPnPProductsThatAreActive();
            const pnpOrders$ =  this.addPnPRegionsDeliAndPremiumOrderTogether(JSON.parse(JSON.stringify(workingOrders)));
            const pnpproductTotals$ = this.getTotalAmountOfEachPnPProductForDate(JSON.parse(JSON.stringify(workingOrders)));
            return combineLatest([allPnPActiveProducts$, pnpOrders$, pnpproductTotals$]).pipe(
                map(data => createPnPMatrix(data[0], data[1], data[2])),
                tap(data => console.log('PnP Orders Matrix ', data))
            );

        };

        if (orders) {
            return pnpRegionsAndProductsMatrix(orders);
        } else {
            return this.getSelectedDayPnPOrders().pipe(
                switchMap(newlyFetchedOrders => pnpRegionsAndProductsMatrix(newlyFetchedOrders))
            );
        }
    }

    getTotalAmountOfEachPnPProductForDate(orders?: IPnPOrder[]): Observable<any> {

        const addSameProductsTogether = (workingOrders: IPnPOrder[]): Observable<any> => {
            const productGroup: IPnPOrderProduct[]  = [];

            const individualProducts = (orderProduct: IPnPOrderProduct) => {
                let prodNotFound = true;
                for (let group = 0; group < productGroup.length; group++) {
                    if (orderProduct.productid === productGroup[group].productid) {
                        productGroup[group].amount = productGroup[group].amount + orderProduct.amount;
                        prodNotFound = false;
                    }
                }
                if (prodNotFound) {
                    productGroup.push(orderProduct);
                }
            };

            for (let order = 0; order < workingOrders.length; order++) {
                for (let product = 0; product < workingOrders[order].products.length; product++) {
                    individualProducts(workingOrders[order].products[product]);
                }
            }
            this.toolBoxService.sorting(productGroup, 'rankingInGroup');
            return of(productGroup);
        };

        if (orders) {
            return addSameProductsTogether(orders);
        } else {
            return this.getSelectedDayPnPOrders().pipe(
                switchMap(newlyFetchedOrders => addSameProductsTogether(newlyFetchedOrders))
            );
        }
    }

    getSelectedDayPnPOrders(): Observable<IPnPOrder[]> {
        return this.getDateService.currentDatePackage$.pipe(
            switchMap(datePackage => {
                if (datePackage.id === null) {
                    return of([]);
                } else {
                    return this.pnpSharedApiService.getPnPOrder(datePackage);
                }
            })
        );
    }

}
