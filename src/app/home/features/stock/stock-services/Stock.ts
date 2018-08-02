export class IProductDetails {
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
    stock: IProductDetails[];
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

export class IProductContainers {
    productid: string;
    container: string;
}

export class IContainerGroups {
    name: string;
    containers: string[];
}
