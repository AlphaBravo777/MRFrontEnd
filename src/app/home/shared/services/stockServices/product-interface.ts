export class IProductDetails {
    productMRid: string;
    productid: number;
    packageWeight: number;
    rankingInGroup: number;
    proddescription?: string;
    productonhold?: boolean;
    batchRanking?: number;
    packaging?: number;
    brand?: number;
    unitWeight?: number;
}

export class IPnPOrderProduct extends IProductDetails {
    amount: number;
    lugSize: number;
}

export class IProductOrderDetails extends IProductDetails {
    amount: number;
    lugSize: number;
}

