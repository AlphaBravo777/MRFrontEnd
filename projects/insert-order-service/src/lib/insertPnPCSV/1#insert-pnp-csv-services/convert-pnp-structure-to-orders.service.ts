import { Injectable } from '@angular/core';
import { IPnPCSVData,
         IOrderDetails} from '../../#sharedServices/interfaces/insert-order-service-Interfaces';
import { IAccountDetails } from 'src/app/home/shared/services/accountServices/account-interface';
import { IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { DatePickerService } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-picker.service';

@Injectable({
    providedIn: 'root'
})
export class ConvertPnpStructureToOrdersService {

    constructor(private datePickerService: DatePickerService) {}

    coastalDelieveryDateModifier = 2;
    inlandDeliveryDateModifier = 1;
    deliveryDateAtDC: Date;

    private calculateDcDeliveryDate(currentDate, days) {
        const longDate = this.datePickerService.shortToLongDate(currentDate);
        this.deliveryDateAtDC =  new Date(longDate.setDate(longDate.getDate() - days));
        const shortDCDate = this.datePickerService.longToShortDate(this.deliveryDateAtDC);
        return shortDCDate;
    }

    private createPnPAccount(vendorFirstOrderDetail: IPnPCSVData) {
        switch (vendorFirstOrderDetail.storeCode) {
            case 'MA08':
                switch (vendorFirstOrderDetail.vendorCode) {
                    case 'P70':
                        return {accountid: 8, commonName: 'KZN - PnP Deli', parrentAccountid: 7,
                        orderNumber: vendorFirstOrderDetail.PONumber,
                        deliveryDateAtDC:
                            this.calculateDcDeliveryDate(vendorFirstOrderDetail.deliveryDate, this.coastalDelieveryDateModifier)};
                    default:
                        return {accountid: 4, commonName: 'KZN - PnP Premium/NN', parrentAccountid: 8,
                        orderNumber: vendorFirstOrderDetail.PONumber,
                        deliveryDateAtDC:
                            this.calculateDcDeliveryDate(vendorFirstOrderDetail.deliveryDate, this.coastalDelieveryDateModifier)};
                }
            case 'MA09':
                switch (vendorFirstOrderDetail.vendorCode) {
                    case 'P70':
                        return {accountid: 7, commonName: 'INL - PnP Deli', parrentAccountid: 7,
                        orderNumber: vendorFirstOrderDetail.PONumber,
                        deliveryDateAtDC:
                            this.calculateDcDeliveryDate(vendorFirstOrderDetail.deliveryDate, this.inlandDeliveryDateModifier)};
                    default:
                        return {accountid: 3, commonName: 'INL - PnP Premium/NN', parrentAccountid: 8,
                        orderNumber: vendorFirstOrderDetail.PONumber,
                        deliveryDateAtDC:
                            this.calculateDcDeliveryDate(vendorFirstOrderDetail.deliveryDate, this.inlandDeliveryDateModifier)};
                }
            case 'MA06':
                switch (vendorFirstOrderDetail.vendorCode) {
                    case 'P70':
                        return {accountid: 10, commonName: 'WC - PnP Deli', parrentAccountid: 7,
                        orderNumber: vendorFirstOrderDetail.PONumber,
                        deliveryDateAtDC:
                            this.calculateDcDeliveryDate(vendorFirstOrderDetail.deliveryDate, this.coastalDelieveryDateModifier)};
                    default:
                        return {accountid: 6, commonName: 'WC - PnP Premium/NN', parrentAccountid: 8,
                        orderNumber: vendorFirstOrderDetail.PONumber,
                        deliveryDateAtDC:
                            this.calculateDcDeliveryDate(vendorFirstOrderDetail.deliveryDate, this.coastalDelieveryDateModifier)};
                }
            case 'EA91':
                switch (vendorFirstOrderDetail.vendorCode) {
                    case 'P70':
                        return {accountid: 9, commonName: 'PE - PnP Deli', parrentAccountid: 7,
                        orderNumber: vendorFirstOrderDetail.PONumber,
                        deliveryDateAtDC:
                            this.calculateDcDeliveryDate(vendorFirstOrderDetail.deliveryDate, this.coastalDelieveryDateModifier)};
                    default:
                        return {accountid: 5, commonName: 'PE - PnP Premium/NN', parrentAccountid: 8,
                        orderNumber: vendorFirstOrderDetail.PONumber,
                        deliveryDateAtDC:
                            this.calculateDcDeliveryDate(vendorFirstOrderDetail.deliveryDate, this.coastalDelieveryDateModifier)};
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

    private createPnPOrderFactory(pnpVendorOrder: IPnPCSVData[], products: IProductOrderDetails[]): IOrderDetails {
        const accountDetail = this.createPnPAccount(pnpVendorOrder[0]);
        const newPnPAccountObj: IAccountDetails = {
            accountid: accountDetail.accountid,
            accountMRid: pnpVendorOrder[0].storeCode,
            accountName: accountDetail.commonName,
            commonName: accountDetail.commonName,
            parentAccountid: accountDetail.parrentAccountid,
            routeid: 18,
            accountID: 'Insert GraphQL string',
            routeName: 'PnP LongMeadow DC',
            franchiseid: 2,
            productGroupid: null,
        };
        const pnpOrder: IOrderDetails = Object.assign({
            orderid: null,
            deliveryDate: accountDetail.deliveryDateAtDC,
            orderDate: accountDetail.deliveryDateAtDC,
            timeStampid: null,
            userid: JSON.parse(localStorage.getItem('userID')),
            orders: products,
            orderNumber: (accountDetail.orderNumber).toString(),
        }, newPnPAccountObj);
        return pnpOrder;
    }

    private createPnPProductsFactory(pnpVendorOrder: IPnPCSVData[]): IProductOrderDetails[] {
        const pnpProductsArray = [];
        for (let prod = 0; prod < pnpVendorOrder.length; prod++) {
            const productDetail = this.createPnPProduct(pnpVendorOrder[prod]);
            const newPnPProductObj: IProductOrderDetails = {
                productid: productDetail.productid,
                productMRid: pnpVendorOrder[prod].vendorProductCode,
                lugSize: productDetail.lugSize,
                packageWeight: productDetail.unitWeight * pnpVendorOrder[prod].packSize,
                rankingInGroup: productDetail.rankingInGroup,
                batchRanking: 1,
                amount: pnpVendorOrder[prod].quantity,
                orderDetailsid: null,
                userid: JSON.parse(localStorage.getItem('userID'))
            };
            pnpProductsArray.push(newPnPProductObj);
        }
        console.log('createPnPProducts =', pnpProductsArray);
        return pnpProductsArray;
    }

    factoryConvertPnPDataToOrders(pnpVendorOrder: IPnPCSVData[]) {
        const pnpProducts: IProductOrderDetails[]  = this.createPnPProductsFactory(pnpVendorOrder);
        const pnpOrder: IOrderDetails = this.createPnPOrderFactory(pnpVendorOrder, pnpProducts);
        return pnpOrder;
    }
}
