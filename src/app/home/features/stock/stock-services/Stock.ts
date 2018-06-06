export class ProcessedStock {
    brand: String;
    packaging: String;
    weight: Number;
    code: String;

    constructor(brand: String, packaging: String, weight: Number, code: String) {
        this.brand = brand;
        this.packaging = packaging;
        this.weight = weight;
        this.code = code;
    }
}
