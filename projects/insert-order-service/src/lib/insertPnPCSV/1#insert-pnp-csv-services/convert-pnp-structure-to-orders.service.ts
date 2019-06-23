import { Injectable } from '@angular/core';
import { IPnPCSVData, IAccountDetails, IPnPCSVGroupedData } from '../../#sharedServices/insert-order-service-Interfaces';

@Injectable({
    providedIn: 'root'
})
export class ConvertPnpStructureToOrdersService {
    constructor() {}

    private createPnPAccount(regionCode, vendorCode) {
        switch (regionCode) {
            case 'MA08':
                switch (vendorCode) {
                    case 'P70':
                        return {accountid: 10, commonName: 'KZN - PnP Deli', parrentAccountid: 7} ;
                    default:
                        return {accountid: 16, commonName: 'KZN - PnP Premium/NN', parrentAccountid: 8};
                }
            case 'MA09':
                switch (vendorCode) {
                    case 'P70':
                        return {accountid: 11, commonName: 'INL - PnP Deli', parrentAccountid: 7};
                    default:
                        return {accountid: 17, commonName: 'INL - PnP Premium/NN', parrentAccountid: 8};
                }
            case 'MA06':
                switch (vendorCode) {
                    case 'P70':
                        return {accountid: 9, commonName: 'WC - PnP Deli', parrentAccountid: 7} ;
                    default:
                        return {accountid: 14, commonName: 'WC - PnP Premium/NN', parrentAccountid: 8};
                }
            case 'EA91':
                switch (vendorCode) {
                    case 'P70':
                        return {accountid: 12, commonName: 'PE - PnP Deli', parrentAccountid: 7};
                    default:
                        return {accountid: 15, commonName: 'PE - PnP Premium/NN', parrentAccountid: 8};
                }
        }
    }

    private createPnPAccountFactory(pnpVendorOrder: IPnPCSVGroupedData): IAccountDetails {
        const accountDetail = this.createPnPAccount(pnpVendorOrder.key, pnpVendorOrder.values[0].vendorCode);
        const newPnPAccountObj: IAccountDetails = {} as IAccountDetails;
        newPnPAccountObj.accountid = accountDetail.accountid;
        newPnPAccountObj.accountMRid = pnpVendorOrder.key;
        newPnPAccountObj.accountName = accountDetail.commonName;
        newPnPAccountObj.commonName = accountDetail.commonName;
        newPnPAccountObj.parentAccountid = accountDetail.parrentAccountid;
        newPnPAccountObj.routeid = 18;
        return newPnPAccountObj;
    }

    factoryConvertPnPDataToOrders(pnpVendorOrder) {
        const pnpAccount = this.createPnPAccountFactory(pnpVendorOrder);
        // const newPnPObj: IPnPCSVData = {} as IPnPCSVData;
        // newPnPObj.barcodeNumber = parseInt(oldCSVObj['BARCODE NUMBER'], 10);
        // newPnPObj.costPriceIncludingVAT = parseFloat(oldCSVObj['COST PRICE (Incl VAT)']);
        // newPnPObj.currency = oldCSVObj.CURRENCY;
        // newPnPObj.deliveryDate = oldCSVObj['DELIVERY DATE'];
        // newPnPObj.description = oldCSVObj.DESCRIPTION;
        // newPnPObj.msgid = parseInt(oldCSVObj['MSG ID'], 10);
        // newPnPObj.orderDate = oldCSVObj['ORDER DATE'];
        // newPnPObj.packSize = parseInt(oldCSVObj['PACK SIZE'], 10);
        // newPnPObj.PONumber = parseInt(oldCSVObj['PO NUMBER'], 10);
        // newPnPObj.POType = 'Allocation DC';
        // newPnPObj.quantity = parseInt(oldCSVObj.QTY, 10);
        // newPnPObj.storeCode = oldCSVObj['STORE CODE'];
        // newPnPObj.storeDescription = oldCSVObj['STORE DESCRIPTION'];
        // newPnPObj.vendorCode = this.vendorCode(
        //     parseInt(oldCSVObj['VENDOR CODE'], 10)
        // );
        // newPnPObj.vendorProductCode = this.productCode(
        //     oldCSVObj['VENDOR PRODUCT CODE']
        // );
        // return newPnPObj;
        return pnpAccount;
    }
}
