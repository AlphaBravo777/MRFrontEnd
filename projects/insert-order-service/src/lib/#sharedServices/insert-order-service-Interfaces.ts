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
}
