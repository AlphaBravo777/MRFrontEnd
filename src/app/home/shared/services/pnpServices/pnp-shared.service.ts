import { Injectable } from '@angular/core';
import { PnpSharedApiService } from './pnp-shared-api.service';
import { GetDate$Service } from '../../main-portal/date-picker/date-picker-service/get-date$.service';
import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { IPnPOrderMatrix, IPnPOrderTotals, IPalletPickedDetails } from './pnp-shared-interfaces';
import { ToolboxGroupService } from '../toolbox/toolbox-group.service';
import { IProductOrderDetails } from '../productServices/products-interface';
import { IOrderDetails } from 'projects/insert-order-service/src/lib/#sharedServices/interfaces/insert-order-service-Interfaces';

@Injectable({
    providedIn: 'root'
})
export class PnpSharedService {

    constructor(private pnpSharedApiService: PnpSharedApiService,
        private getDateService: GetDate$Service,
        private toolBoxService: ToolboxGroupService) {}

    getAllPnPProductsThatAreActive(): Observable<IProductOrderDetails[]> {
        return this.pnpSharedApiService.getAllPnPProductsThatAreActive().pipe(
            map(data => this.toolBoxService.sorting(data, 'rankingInGroup')),
            // tap(data => console.log('All active PnP products = ', data))
        );
    }

    addPnPRegionsDeliAndPremiumOrderTogether(orders: IOrderDetails[]): Observable<IOrderDetails[]> {
        const combinedOrderArray: IOrderDetails[] = [];
        orders.sort((a, b) => b.orders.length - a.orders.length);
        // console.log('Sorted orders',  orders);
        for (let order = 0; order < orders.length; order++) {
            let orderNotFound = true;
            for (let newOrder = 0; newOrder < combinedOrderArray.length; newOrder++) {
                if (orders[order].accountMRid === combinedOrderArray[newOrder].accountMRid) {
                    orders[order].orders.forEach(product => {
                        const found = combinedOrderArray[newOrder].orders.find(prod => prod.productid === product.productid);
                        if (found) {
                            found.amount = found.amount + product.amount;
                        } else {
                            combinedOrderArray[newOrder].orders.push(product);
                        }
                    });
                    orderNotFound = false;
                    break;
                }
            }
            if (orderNotFound) {
                combinedOrderArray.push(orders[order]);
                combinedOrderArray[combinedOrderArray.length - 1].commonName =
                    orders[order].commonName.substr(0, orders[order].commonName.indexOf(' '));
            }
        }
        // console.log('The new Order array = ', combinedOrderArray);
        return of(combinedOrderArray);
    }

    calculateTotalPnPOrderWeightForDate(orders?: IOrderDetails[]): Observable<IPnPOrderTotals> {

        const addProductWeightsTogether = (workingOrders: IOrderDetails[]): Observable<IPnPOrderTotals> => {
            let pnpOrderTotalWeight = 0;
            let pnpOrderTotalLugs = 0;

            for (let order = 0; order < workingOrders.length; order++) {
                for (let product = 0; product < workingOrders[order].orders.length; product++) {
                    const productWeight = workingOrders[order].orders[product].amount *
                        workingOrders[order].orders[product].packageWeight;
                    pnpOrderTotalWeight = pnpOrderTotalWeight + productWeight;
                    pnpOrderTotalLugs = pnpOrderTotalLugs + workingOrders[order].orders[product].amount;
                }
            }
            // console.log('The total number of pnp Lugs are: ', pnpOrderTotalLugs);
            return of({pnpOrderTotalWeight: pnpOrderTotalWeight,
                pnpOrderTotalLugs: pnpOrderTotalLugs, pnpOrderTotalPallets: null});
        };

        if (orders) {
            return addProductWeightsTogether(orders);
        } else {
            return this.getSelectedDayPnPOrders().pipe(
                switchMap(newlyFetchedOrders => addProductWeightsTogether(newlyFetchedOrders))
            );
        }
    }

    createPnPRegionsAndProductsMatrix(orders?: IOrderDetails[]): Observable<IPnPOrderMatrix> {
        // console.log('Here is the Matrix order data: ', JSON.parse(JSON.stringify(orders)));

        const pnpRegionsAndProductsMatrix = (workingOrders: IOrderDetails[]): Observable<IPnPOrderMatrix> => {

            const pnpOrderMatrix: IPnPOrderMatrix = {heading: [], products: []};

            const createPnPMatrix = (
                pnpActiveProducts: IProductOrderDetails[],
                pnpOrders: IOrderDetails[],
                pnpProductTotals: IProductOrderDetails[]): IPnPOrderMatrix => {

                const enterColumn = (title: String, productList: IProductOrderDetails[]) => {
                    pnpOrderMatrix.heading.push(title);
                    for (let matrixProd = 0; matrixProd < pnpOrderMatrix.products.length; matrixProd++) {
                        let productNotFound = true;
                        for (let product = 0; product < productList.length; product++) {
                            if (productList[product].productid === pnpOrderMatrix.products[matrixProd].productName.productid) {
                                pnpOrderMatrix.products[matrixProd].productAmounts.push(productList[product].amount);
                                productNotFound = false;
                            }
                        }
                        if (productNotFound) {
                            // If the order does not have a product then enter "0" to keep spacing
                            pnpOrderMatrix.products[matrixProd].productAmounts.push(0);
                        }
                    }
                };

                const enterWeightColumn = (title: String, productList: IProductOrderDetails[]) => {
                    pnpOrderMatrix.heading.push(title);
                    for (let matrixProd = 0; matrixProd < pnpOrderMatrix.products.length; matrixProd++) {
                        let productNotFound = true;
                        for (let product = 0; product < productList.length; product++) {
                            if (productList[product].productid === pnpOrderMatrix.products[matrixProd].productName.productid) {
                                pnpOrderMatrix.products[matrixProd].productAmounts.push(productList[product].unitWeight);
                                productNotFound = false;
                            }
                        }
                        if (productNotFound) {
                            // If the order does not have a product then enter "0" to keep spacing
                            pnpOrderMatrix.products[matrixProd].productAmounts.push(0);
                        }
                    }
                };

                pnpOrderMatrix.heading.push('Products'); // This is the heading of the products colm
                for (let actProd = 0; actProd < pnpActiveProducts.length; actProd++) {
                    pnpOrderMatrix.products.push({productName: pnpActiveProducts[actProd], productAmounts: [], productWeights: []});
                }
                for (let order = 0; order < pnpOrders.length; order++) {
                    enterColumn(pnpOrders[order].commonName, pnpOrders[order].orders);
                }
                enterColumn('T/Lugs', pnpProductTotals);
                // enterWeightColumn('T Weight', pnpProductTotals);  // This will add a weight column for each product as well
                return pnpOrderMatrix;
            };

            const allPnPActiveProducts$ = this.getAllPnPProductsThatAreActive();
            const pnpOrders$ =  this.addPnPRegionsDeliAndPremiumOrderTogether(JSON.parse(JSON.stringify(workingOrders)));
            const pnpproductTotals$ = this.getTotalAmountOfEachPnPProductForDate(JSON.parse(JSON.stringify(workingOrders)));
            return combineLatest([allPnPActiveProducts$, pnpOrders$, pnpproductTotals$]).pipe(
                tap(data => console.log('PnP Orders Matrix ', data)),
                map(data => createPnPMatrix(data[0], data[1], data[2])),
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

    getTotalAmountOfEachPnPProductForDate(orders?: IOrderDetails[]): Observable<IProductOrderDetails[]> {

        const addSameProductsTogether = (workingOrders: IOrderDetails[]): Observable<IProductOrderDetails[]> => {
            let productGroup: IProductOrderDetails[]  = [];

            const individualProducts = (orderProduct: IProductOrderDetails) => {
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
                for (let product = 0; product < workingOrders[order].orders.length; product++) {
                    individualProducts(workingOrders[order].orders[product]);
                }
            }
            this.toolBoxService.sorting(productGroup, 'rankingInGroup');
            productGroup = this.calculateTotalWeightForEachProduct(productGroup);
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

    calculateTotalWeightForEachProduct = (products: IProductOrderDetails[]) => {
            products.forEach(product => product.unitWeight = product.amount * product.packageWeight);
            return products;
    }

    getSelectedDayPnPOrders(): Observable<IOrderDetails[]> {
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

    calculateTotalPalletsForOrder(pallets: IPalletPickedDetails[]): Observable<number> {
        let totalPalletsForOrder = 0;
        pallets.forEach(pallet => totalPalletsForOrder++);
        return of(totalPalletsForOrder);
    }

}
