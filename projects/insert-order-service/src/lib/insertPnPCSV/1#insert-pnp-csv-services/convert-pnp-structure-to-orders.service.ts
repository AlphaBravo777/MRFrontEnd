import { Injectable } from '@angular/core';
import { IPnPCSVData,
         IAccountDetails,
         IPnPCSVGroupedData,
         IProductOrderDetails,
         IOrderDetails} from '../../#sharedServices/insert-order-service-Interfaces';

@Injectable({
    providedIn: 'root'
})
export class ConvertPnpStructureToOrdersService {
    constructor() {}

    private createPnPAccount(regionCode, vendorFirstOrderDetail: IPnPCSVData) {
        switch (regionCode) {
            case 'MA08':
                switch (vendorFirstOrderDetail.vendorCode) {
                    case 'P70':
                        return {accountid: 10, commonName: 'KZN - PnP Deli', parrentAccountid: 7,
                        orderNumber: vendorFirstOrderDetail.PONumber} ;
                    default:
                        return {accountid: 16, commonName: 'KZN - PnP Premium/NN', parrentAccountid: 8,
                        orderNumber: vendorFirstOrderDetail.PONumber} ;
                }
            case 'MA09':
                switch (vendorFirstOrderDetail.vendorCode) {
                    case 'P70':
                        return {accountid: 11, commonName: 'INL - PnP Deli', parrentAccountid: 7,
                        orderNumber: vendorFirstOrderDetail.PONumber} ;
                    default:
                        return {accountid: 17, commonName: 'INL - PnP Premium/NN', parrentAccountid: 8,
                        orderNumber: vendorFirstOrderDetail.PONumber} ;
                }
            case 'MA06':
                switch (vendorFirstOrderDetail.vendorCode) {
                    case 'P70':
                        return {accountid: 9, commonName: 'WC - PnP Deli', parrentAccountid: 7,
                        orderNumber: vendorFirstOrderDetail.PONumber} ;
                    default:
                        return {accountid: 14, commonName: 'WC - PnP Premium/NN', parrentAccountid: 8,
                        orderNumber: vendorFirstOrderDetail.PONumber} ;
                }
            case 'EA91':
                switch (vendorFirstOrderDetail.vendorCode) {
                    case 'P70':
                        return {accountid: 12, commonName: 'PE - PnP Deli', parrentAccountid: 7,
                        orderNumber: vendorFirstOrderDetail.PONumber} ;
                    default:
                        return {accountid: 15, commonName: 'PE - PnP Premium/NN', parrentAccountid: 8,
                        orderNumber: vendorFirstOrderDetail.PONumber} ;
                }
        }
    }

    private createPnPProduct(pnpRawProduct: IPnPCSVData) {
        switch (pnpRawProduct.vendorProductCode) {
            case 'CV1NN':
                return {productid: 9, unitWeight: 1, lugSize: 2, rankingInGroup: 13,
                proddescription: 'PnP No Name Chicken Vienna 1 kg'};
            case 'SV1NN':
                return {productid: 81, unitWeight: 1, lugSize: 2, rankingInGroup: 11,
                proddescription: 'PnP No Name Smoke Vienna 1 kg'};
            case 'RV1NN':
                return {productid: 65, unitWeight: 1, lugSize: 2, rankingInGroup: 9,
                proddescription: 'PnP No Name Red Vienna 1 kg'};
            case 'CV500NN':
                return {productid: 10, unitWeight: 0.5, lugSize: 1, rankingInGroup: 12,
                proddescription: 'PnP No Name Chicken Vienna 500g'};
            case 'SV500NN':
                return {productid: 85, unitWeight: 0.5, lugSize: 1, rankingInGroup: 10,
                proddescription: 'PnP No Name Smoke Vienna 500g'};
            case 'RV500NN':
                return {productid: 69, unitWeight: 0.5, lugSize: 1, rankingInGroup: 8,
                proddescription: 'PnP No Name Red Vienna 500g'};
            case 'PCCV1':
                return {productid: 49, unitWeight: 1, lugSize: 2, rankingInGroup: 17,
                proddescription: 'PnP Prem Chicken & Cheese Vienna 1 kg'};
            case 'PCCV500':
                return {productid: 50, unitWeight: 0.5, lugSize: 1, rankingInGroup: 16,
                proddescription: 'PnP Prem Chicken & Cheese Vienna 500g'};
            case 'PCV1':
                return {productid: 52, unitWeight: 1, lugSize: 2, rankingInGroup: 15,
                proddescription: 'PnP Prem Chicken Vienna 1 kg'};
            case 'PCV500':
                return {productid: 53, unitWeight: 0.5, lugSize: 1, rankingInGroup: 14,
                proddescription: 'PnP Prem Chicken Vienna 500g'};
            case 'PPSV1':
                return {productid: 56, unitWeight: 1, lugSize: 2, rankingInGroup: 19,
                proddescription: 'PnP Prem Pork Smoke Vienna 1 kg'};
            case 'PPSV500':
                return {productid: 57, unitWeight: 0.5, lugSize: 1, rankingInGroup: 18,
                proddescription: 'PnP Prem Pork Smoke Vienna 500g'};
            case 'PCCP750':
                return {productid: 48, unitWeight: 0.75, lugSize: 1, rankingInGroup: 21,
                proddescription: 'PnP Prem Chicken Cheese Polony 750g'};
            case 'PCP900':
                return {productid: 51, unitWeight: .9, lugSize: 2, rankingInGroup: 20,
                proddescription: 'PnP Prem Chicken Polony 900g'};
            case 'PVP3':
                return {productid: 60, unitWeight: 3, lugSize: 2, rankingInGroup: 22,
                proddescription: 'PnP Hamper 3 kg'};
            case 'PDF1':
                return {productid: 127, unitWeight: 1, lugSize: 1, rankingInGroup: 1,
                proddescription: 'PnP Deli Foot Long 1kg Singles'};
            case 'PDR1':
                return {productid: 126, unitWeight: 1, lugSize: 1, rankingInGroup: 2,
                proddescription: 'PnP Deli Russian 1kg Singles'};
            case 'PDS1':
                return {productid: 125, unitWeight: 1, lugSize: 1, rankingInGroup: 3,
                proddescription: 'PnP Deli Smokie 1kg Singles '};
            case 'PDS500':
                return {productid: 54, unitWeight: 0.5, lugSize: 1, rankingInGroup: 5,
                proddescription: 'PnP Deli Smokie 500g'};
            case 'PDV500':
                return {productid: 55, unitWeight: 0.5, lugSize: 1, rankingInGroup: 4,
                proddescription: 'PnP Deli Smoke Vienna 500g'};
            case 'PRV1':
                return {productid: 123, unitWeight: 1, lugSize: 1, rankingInGroup: 6,
                proddescription: 'PnP Deli Red Vienna 1kg'};
            case 'PSV1':
                return {productid: 124, unitWeight: 1, lugSize: 1, rankingInGroup: 7,
                proddescription: 'PnP Deli Smoke Vienna 1kg'};
            default:
                return {productid: null, unitWeight: null, lugSize: null, rankingInGroup: null,
                proddescription: 'undefined'} ;
        }
    }

    private createPnPAccountFactory(pnpVendorOrder: IPnPCSVGroupedData): IAccountDetails {
        const accountDetail = this.createPnPAccount(pnpVendorOrder.key, pnpVendorOrder.values[0]);
        const newPnPAccountObj: IAccountDetails = {
            accountid: accountDetail.accountid,
            accountMRid: pnpVendorOrder.key,
            accountName: accountDetail.commonName,
            commonName: accountDetail.commonName,
            parentAccountid: accountDetail.parrentAccountid,
            routeid: 18,
            orderNumber: accountDetail.orderNumber,
            accountID: 'Insert GraphQL string',
            routeName: 'PnP LongMeadow DC'
        };
        return newPnPAccountObj;
    }

    private createPnPProductsFactory(pnpVendorOrder: IPnPCSVGroupedData): IProductOrderDetails[] {
        const pnpProductsArray = [];
        for (let prod = 0; prod < pnpVendorOrder.values.length; prod++) {
            const productDetail = this.createPnPProduct(pnpVendorOrder.values[prod]);
            const newPnPProductObj: IProductOrderDetails = {
                productid: productDetail.productid,
                productMRid: pnpVendorOrder.values[prod].vendorProductCode,
                lugSize: productDetail.lugSize,
                packageWeight: pnpVendorOrder.values[prod].packSize,
                rankingInGroup: productDetail.rankingInGroup,
                batchRanking: 1,
                amount: pnpVendorOrder.values[prod].quantity,
                orderDetailsid: null,
                userid: null
            };
            pnpProductsArray.push(newPnPProductObj);
        }
        console.log('createPnPProducts =', pnpProductsArray);
        return pnpProductsArray;
    }

    createPnPOrderFactory(pnpAccount: IAccountDetails, pnpProducts: IProductOrderDetails[]): IOrderDetails {
        const pnpOrder: IOrderDetails = Object.assign({
                    orderDate: null,
                    timeStampid: null,
                    userid: null,
                    orders: pnpProducts
                },
                pnpAccount);
        return pnpOrder;
    }

    factoryConvertPnPDataToOrders(pnpVendorOrder) {
        const pnpAccount: IAccountDetails = this.createPnPAccountFactory(pnpVendorOrder);
        const pnpProducts: IProductOrderDetails[]  = this.createPnPProductsFactory(pnpVendorOrder);
        const pnpOrder: IOrderDetails = this.createPnPOrderFactory(pnpAccount, pnpProducts);
        return pnpOrder;
    }
}
