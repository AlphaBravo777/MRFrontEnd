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
    lugSize: number;
}

export class IProductGroupName {
    id: number;
    ID: string;
    groupName: string;
}

// export class IProductDetails {
//     productMRid: string;
//     productid: number;
//     packageWeight: number;
//     rankingInGroup: number;
//     proddescription?: string;
//     productonhold?: boolean;
//     batchRanking?: number;
//     packaging?: number;
//     brand?: number;
//     unitWeight?: number;
//     lugSize: number;
// }

export class IProductOrderDetails extends IProductDetails {
    amountid?: number;
    amount: number;
    orderDetailsid: number;
    userid: number;
    status?: boolean;
    lastModified?: string;
}
