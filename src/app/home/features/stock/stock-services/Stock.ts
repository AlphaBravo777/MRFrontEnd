import { IProductDetails } from 'src/app/home/shared/services/productServices/products-interface';

export class IProductDetailsStockDepricated {
    brand: string;
    packaging: string;
    unitweight: Number;
    productid: string;
    batchgroup: string;
    description: string;

    constructor (brand: string, packaging: string, weight: Number, code: string, batchGroup: string, description: string) {
        this.brand = brand;
        this.packaging = packaging;
        this.unitweight = weight;
        this.productid = code;
        this.batchgroup = batchGroup;
        this.description = description;
    }
}

export class IProductGroup {
    stock: IProductDetailsStockDepricated[];
    group: string;
}
// -------------------------------------------------------------------
export class IProcessedStockProducts {
    product: string;
    mainContainer: IProcessedStockContainer[];
}

export class IProcessedStockContainer {
    container: string;
    amount: string[];
}
// -------------------------------------------------------------------
export class IRawProcessedStock {
    name: string;
    amount: string;
    container: string;
    time?: string;
}
// -------------------------------------------------------------------
export class IProductContainers {
    id: number;
    productid: string;
    container: string;
    deleteContainerAmount: boolean;
}
// -------------------------------------------------------------------
export class IContainerGroups {
    name: string;
    containers: string[];
}
// -------------------------------------------------------------------
export class IDeleteGroups {
    container: string;
    delete: boolean;
}

export class IProdDeleteGroups {
    product: string;
    mainContainer: IDeleteGroups[];
}
// -------------------------------------------------------------------
