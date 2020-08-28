import { Injectable } from '@angular/core';
import { IPnPCSVFormat, IPnPCSVData } from '../../#sharedServices/interfaces/pnp-csv-interface';

@Injectable({
  providedIn: 'root'
})
export class ConvertPnpCsvDataFactoryService {

    constructor() {}

    private productCode(prod: string): string {
        switch (prod) {
            case 'NNB001':
                return 'CV1NN';
            case 'NNB002':
                return 'SV1NN';
            case 'NNB003':
                return 'RV1NN';
            case 'NNB004':
                return 'CV500NN';
            case 'NNB005':
                return 'SV500NN';
            case 'NNB006':
                return 'RV500NN';
            case 'NNB007':
                return 'SS500NN';
            case 'NNB008':
                return 'PHP2.5';
            case 'PVP3.0':
                return 'PVP3';
            case '711045':
                return 'PCCV-CT';
            default:
                return prod;
        }
    }

    private vendorCode(venCode: number): string {
        switch (venCode) {
            case 1000005555:
                return 'P74';
            case 1000001415:
                return 'P70';
            default:
                return undefined;
        }
    }

    factoryConvertPnPRawData(oldCSVObj: IPnPCSVFormat): IPnPCSVData {
        const newPnPObj: IPnPCSVData = {} as IPnPCSVData;
        newPnPObj.barcodeNumber = parseInt(oldCSVObj['BARCODE NUMBER'], 10);
        newPnPObj.costPriceIncludingVAT = parseFloat(oldCSVObj['COST PRICE (Incl VAT)']);
        newPnPObj.currency = oldCSVObj.CURRENCY;
        newPnPObj.deliveryDate = oldCSVObj['DELIVERY DATE'];
        newPnPObj.description = oldCSVObj.DESCRIPTION;
        newPnPObj.msgid = parseInt(oldCSVObj['MSG ID'], 10);
        newPnPObj.orderDate = oldCSVObj['ORDER DATE'];
        newPnPObj.packSize = parseInt(oldCSVObj['PACK SIZE'], 10);
        newPnPObj.PONumber = parseInt(oldCSVObj['PO NUMBER'], 10);
        newPnPObj.POType = 'Allocation DC';
        newPnPObj.quantity = parseInt(oldCSVObj.QTY, 10);
        newPnPObj.storeCode = oldCSVObj['STORE CODE'];
        newPnPObj.storeDescription = oldCSVObj['STORE DESCRIPTION'];
        newPnPObj.vendorCode = this.vendorCode(parseInt(oldCSVObj['VENDOR CODE'], 10));
        newPnPObj.vendorProductCode = this.productCode(oldCSVObj['VENDOR PRODUCT CODE']);
        return newPnPObj;
    }
}
