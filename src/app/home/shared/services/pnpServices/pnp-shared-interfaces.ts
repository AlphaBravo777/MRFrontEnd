import { IProductOrderDetails } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';

export class IPnPOrderMatrix {
    heading: any[];
    products: IProductsMatrix[];
}

class IProductsMatrix {
    productName: IProductOrderDetails;
    productAmounts: number[];
    productWeights: number[];
}

export class IPnPOrderTotals {
    pnpOrderTotalWeight: number;
    pnpOrderTotalLugs: number;
    pnpOrderTotalPallets: number;

}

export class IPalletPickedDetails {
    palletid: string;
    palletName: string;
    largeLugs: number;
    smallLugs: number;
    products: IProductOrderDetails[];
    smallLugSpace: number;
    lugAmount: number;

}

export class IPnPRegions {
    regionid: string;
    largeLugs: number;
    smallLugs: number;
    commonName: string;
    totalPallets: number;
}

