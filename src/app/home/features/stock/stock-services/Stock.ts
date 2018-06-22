export class ProcessedStock {
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

export class ProcessedGroup {
    stock: ProcessedStock[];
    group: String;
}
