
export class IPnPOrderProduct {
    productMRid: string;
    productid: number;
    amount: number;
    lugSize: number;
    packageWeight: number;
    rankingInGroup: number;
    proddescription?: string;
    productonhold?: boolean;
}

export class IPnPOrder {
    accountID: string;
    commonName: string;
    orderDate: string;
    delivered: boolean;
    products: IPnPOrderProduct[];
}

export class IPnPOrderMatrix {
    regions: any[];
    products: IProductsMatrix[];
}

class IProductsMatrix {
    productName: IPnPOrderProduct;
    productAmounts: number[];
}

export class IPnPOrderTotals {
    pnpOrderTotalWeight: number;
    pnpOrderTotalLugs: number;
}
