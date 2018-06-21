export class ProcessedStock {
    brand: String;
    packaging: String;
    weight: Number;
    code: String;
    batchGroup: String;

    constructor (brand: String, packaging: String, weight: Number, code: String, batchGroup: String) {
        this.brand = brand;
        this.packaging = packaging;
        this.weight = weight;
        this.code = code;
        this.batchGroup = batchGroup;
    }
}

export class ProcessedGroup {
    stock: ProcessedStock;
    group: String;

    constructor (stock: ProcessedStock, group: String) {
        this.stock = stock;
        this.group = group;
    }
}
