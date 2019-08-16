export class IProductDetailsDepricated {
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

export class IPnPOrderProduct extends IProductDetailsDepricated {
    amount: number;
    lugSize: number;
}

export class IProductOrderDetailsDepricated extends IProductDetailsDepricated {
    amount: number;
    lugSize: number;
}

