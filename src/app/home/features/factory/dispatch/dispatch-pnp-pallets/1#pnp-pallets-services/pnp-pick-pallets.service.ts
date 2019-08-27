import { Injectable } from '@angular/core';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { IPalletPickedDetails } from 'src/app/home/shared/services/pnpServices/pnp-shared-interfaces';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { IOrderDetails } from 'projects/insert-order-service/src/lib/#sharedServices/interfaces/order-service-Interfaces';

@Injectable({
    providedIn: 'root'
})
export class PnpPickPalletsService {

    constructor(private toolbox: ToolboxGroupService) {}

    calculatePalletsPerAccountMRid(orders: IOrderDetails[]): IPalletPickedDetails[] {
        const TOPLEVEL = 100;
        const maxTopLevel = 110;

        const calculatePalletsOfOrder = (order: IOrderDetails): IPalletPickedDetails[] => {
            const orderPallets: IPalletPickedDetails[] = [];
            let products = order.orders;

            const createNewFullPallet = (product: IProductOrderDetails): IPalletPickedDetails => {
                let largeLugs = 0;
                let smallLugs = 0;
                if (product.lugSize === 2) {
                    largeLugs = TOPLEVEL / product.lugSize;
                } else {
                    smallLugs = TOPLEVEL / product.lugSize;
                }
                product.amount = TOPLEVEL / product.lugSize;
                // const prod: IProductOrderDetails = {amount: TOPLEVEL / product.lugSize, lugSize: product.lugSize,
                //     packageWeight: product.packageWeight, productMRid: product.productMRid, productid: product.productid,
                //     rankingInGroup: product.rankingInGroup, userid: product.userid, orderDetailsid: product.orderDetailsid};
                const pallet: IPalletPickedDetails = { lugAmount: TOPLEVEL / product.lugSize, products: [product], smallLugSpace: TOPLEVEL,
                    palletid: order.accountMRid, palletName: order.commonName, largeLugs: largeLugs, smallLugs: smallLugs };
                return pallet;
            };

            const createNewHalfPallet = (product: IProductOrderDetails): IPalletPickedDetails => {
                let largeLugs = 0;
                let smallLugs = 0;
                if (product.lugSize === 2) {
                    largeLugs = product.amount;
                } else {
                    smallLugs = product.amount;
                }
                const pallet: IPalletPickedDetails = {lugAmount: product.amount, products: [product],
                    smallLugSpace: product.amount * product.lugSize,
                    palletid: order.accountMRid, palletName: order.commonName, largeLugs: largeLugs, smallLugs: smallLugs};
                return pallet;
            };

            const addToHalfPallet = (pallet: IPalletPickedDetails, product: IProductOrderDetails) => {
                let largeLugs = pallet.largeLugs;
                let smallLugs = pallet.smallLugs;
                pallet.products.push(product);
                if (product.lugSize === 2) {
                    largeLugs = largeLugs + product.amount;
                } else {
                    smallLugs = smallLugs + product.amount;
                }
                pallet.lugAmount = pallet.lugAmount + product.amount;
                pallet.largeLugs = largeLugs;
                pallet.smallLugs = smallLugs;
                pallet.smallLugSpace = pallet.smallLugSpace + (product.amount * product.lugSize);
            };

            for (let prod = 0; prod < products.length; prod++) {
                let smallLugSpace = products[prod].amount * products[prod].lugSize;

                while (smallLugSpace >= TOPLEVEL) { // If the amount is more than a full pallet
                    orderPallets.push(createNewFullPallet(JSON.parse(JSON.stringify(products[prod]))));
                    products[prod].amount = products[prod].amount - TOPLEVEL / products[prod].lugSize;
                    smallLugSpace = products[prod].amount * products[prod].lugSize;
                    if (products[prod].amount <= 0) {
                        // When you splice this number, the for loop jumps a product
                        products.splice(prod, 1);
                        prod--;
                    }
                }
            }

            while (products.length > 0) {
                products = this.toolbox.multiFieldSorting(products, ['lugSize', 'amount']).reverse();
                    if (orderPallets.length > 0) {
                        // if there are already pallets packed
                        if (orderPallets[orderPallets.length - 1].smallLugSpace < TOPLEVEL) {
                            // check if the last pallet has space left open
                            let flag = true;
                            for (let prod = 0; prod < products.length; prod++) {
                                // go through all the product and see if something will fit on it
                                const smallLugAmount = products[prod].amount * products[prod].lugSize;
                                const smallLugAmountLeft = TOPLEVEL - orderPallets[orderPallets.length - 1].smallLugSpace;
                                if (smallLugAmount <= smallLugAmountLeft) {
                                    addToHalfPallet(orderPallets[orderPallets.length - 1], products[prod]);
                                    // When you splice this number, the for loop jumps a product
                                    products.splice(prod, 1);
                                    prod--;
                                    flag = false;
                                }
                            }
                            if (flag && products[0].amount < TOPLEVEL) {
                                orderPallets.push(createNewHalfPallet(products[0]));
                                products.shift();
                            }
                        } else {
                            // if no open pallet, then add the next largest product on an open pallet
                            orderPallets.push(createNewHalfPallet(products[0]));
                            products.shift();
                        }
                    } else {
                        // if no pallets yet, then add product on first pallet.
                        orderPallets.push(createNewHalfPallet(products[0]));
                        products.shift();
                    }
                }
            return orderPallets;
        };

        const totalPallets: IPalletPickedDetails[] = [];
        for (let order = 0; order < orders.length; order++) {
            // console.log('Bravo * ', orders[order].products);
            totalPallets.push.apply(totalPallets, calculatePalletsOfOrder(JSON.parse(JSON.stringify(orders[order]))));
        }
        return totalPallets;
    }

    calculatePalletsPerProductid(orders: IOrderDetails[]): IPalletPickedDetails[] {
        // Here we could insert the business logic that would calculate the pallets so that they are packed per product,
        // the way that the factory would like to send it to hpp.
        return null;
    }

}
