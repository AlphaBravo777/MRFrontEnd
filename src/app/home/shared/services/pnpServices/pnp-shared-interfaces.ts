import { IProductOrderDetails } from '../productServices/products-interface';
import { IAccountDetails } from '../accountServices/account-interface';

// export class IPnPOrder {
//     accountID: string;
//     commonName: string;
//     orderDate: string;
//     delivered: boolean;
//     // products: IPnPOrderProduct[];
//     orders: IProductOrderDetails[];
// }

export class IPnPOrderMatrix {
    heading: any[];
    products: IProductsMatrix[];
}

class IProductsMatrix {
    // productName: IPnPOrderProduct;
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

// accountID: undefined
// amount: 66
// largeLugs: 15
// products: (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// regionName: "KZN - PnP Premium/NN"
// smallLugSpace: 81
// smallLugs: 51
