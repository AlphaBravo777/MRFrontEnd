export class ProductDetails {
    brand: String;
    packaging: String;
    unitweight: Number;
    productid: String;
    batchgroup: String;

    constructor (brand: String, packaging: String, weight: Number, code: String, batchGroup: String) {
        this.brand = brand;
        this.packaging = packaging;
        this.unitweight = weight;
        this.productid = code;
        this.batchgroup = batchGroup;
    }
}

export class ProductGroup {
    stock: ProductDetails[];
    group: String;
}




export class ProcessedStockProducts {
    product: string;
    mainContainer: ProcessedStockContainer[];
}

export class ProcessedStockContainer {
    container: string;
    amount: string[];
}

// When you have something with a ? mark like: 'age?: number', then it means that it is an optional parameter.
