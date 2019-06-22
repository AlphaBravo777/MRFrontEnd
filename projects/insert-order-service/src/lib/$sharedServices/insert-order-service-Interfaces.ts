export class IPnPCSVFormat {
    'BARCODE NUMBER'?: string;
    'COST PRICE (Incl VAT)'?: string;
    CURRENCY?: string;
    'DELIVERY DATE'?: string;
    DESCRIPTION?: string;
    'MSG ID'?: string;
    'ORDER DATE'?: string;
    'PACK SIZE'?: string;
    'PO NUMBER'?: string;
    QTY?: string;
    'STORE CODE'?: string;
    'STORE DESCRIPTION'?: string;
    'VENDOR CODE'?: string;
    'VENDOR PRODUCT CODE'?: string;
}

const productCode = (prod: string): string => {
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
        case 'PVP3.0':
            return 'PVP3';
        default:
            return prod;
    }
};

const vendorCode = (venCode: number): string => {
    switch (venCode) {
        case 1000005555:
            return 'P74';
        case 1000001415:
            return 'P70';
        default:
            return undefined;
    }
};

export class IPnPCSVData {
    barcodeNumber: number;
    costPriceIncludingVAT: number;
    currency: string;
    deliveryDate: string;
    description: string;
    msgid: number;
    orderDate: string;
    packSize: number;
    PONumber: number;
    POType: string;
    quantity: number;
    storeCode: string;
    storeDescription: string;
    vendorCode: string;
    vendorProductCode: string;


    constructor(pnpRawData: IPnPCSVFormat) {
        this.barcodeNumber = parseInt(pnpRawData['BARCODE NUMBER'], 10);
        this.costPriceIncludingVAT = parseFloat(pnpRawData['COST PRICE (Incl VAT)']);
        this.currency = pnpRawData.CURRENCY;
        this.deliveryDate = pnpRawData['DELIVERY DATE'];
        this.description = pnpRawData.DESCRIPTION;
        this.msgid = parseInt(pnpRawData['MSG ID'], 10);
        this.orderDate = pnpRawData['ORDER DATE'];
        this.packSize = parseInt(pnpRawData['PACK SIZE'], 10);
        this.PONumber = parseInt(pnpRawData['PO NUMBER'], 10);
        this.POType = 'Allocation DC';
        this.quantity = parseInt(pnpRawData.QTY, 10);
        this.storeCode = pnpRawData['STORE CODE'];
        this.storeDescription = pnpRawData['STORE DESCRIPTION'];
        this.vendorCode = vendorCode(parseInt(pnpRawData['VENDOR CODE'], 10));
        this.vendorProductCode = productCode(pnpRawData['VENDOR PRODUCT CODE']);


    }
}

export function factoryConvertPnPRawData(obj: IPnPCSVFormat): IPnPCSVData {
    return new IPnPCSVData(obj);
}
