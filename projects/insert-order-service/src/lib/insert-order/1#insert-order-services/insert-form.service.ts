import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProductDetails, IProductOrderDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Injectable({
    providedIn: 'root'
})

export class InsertFormService {

    insertForm: FormGroup;
    routeForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    getInsertForm(): FormGroup {
        this.addPrimaryFields();
        return this.insertForm;
    }

    private addPrimaryFields() {
        this.insertForm = this.fb.group({
            accountid: ['', [Validators.required, Validators.minLength(1)]],
            accountID: [''],
            accountMRid: ['', [Validators.required, Validators.minLength(2)]],
            accountName: [''],
            commonName: ['', [Validators.required, Validators.minLength(6)]],
            parentAccountid: [''],
            orderNumber: ['', [Validators.required, Validators.minLength(4)]],
            orderDate: [''],
            orderid:  [''],
            timeStampid: ['', [Validators.required, Validators.minLength(1)]],
            timeStampID: [''],
            userid: [JSON.parse(JSON.stringify(localStorage.getItem('userID'))), [Validators.required, Validators.minLength(1)]],
            franchiseid: [''],
            franchiseName: [''],
            productGroupid: this.createProductGroupid(),
            productListToPickFrom: this.fb.array([]),
            orders: this.fb.array([], [Validators.required, Validators.minLength(1)])
        });
    }

    insertProductOrderFields(product: IProductDetails, amountid: number, amount: number) {
        // console.log('PRODUCTS ARE: ', JSON.parse(JSON.stringify(product)));
        const control = <FormArray>this.insertForm.controls.orders;
        const orderProduct = this.productFields(product);
        orderProduct.addControl('amountid', this.fb.control(amountid));
        orderProduct.addControl('amount', this.fb.control(amount,
            [Validators.required, Validators.minLength(1), Validators.pattern('[0-9]*')]));
        orderProduct.addControl('orderDetailsid', this.fb.control(null));
        orderProduct.addControl('userid', this.fb.control(JSON.parse(JSON.stringify(localStorage.getItem('userID')))));
        control.push(orderProduct);
    }

    createProductListToPickFrom(products: IProductDetails[]) {
        const control = <FormArray>this.insertForm.controls.productListToPickFrom;
        products.forEach(product => {
            control.push(this.productFields(product));
        });
    }

    private productFields(product: IProductDetails) {
            // console.log('PRODUCT IS: ', JSON.parse(JSON.stringify(product)));
            return this.fb.group({
                productMRid: [product.productMRid,
                    [Validators.required, Validators.minLength(1)]],
                productid: [product.productid],
                packageWeight: [product.packageWeight],
                rankingInGroup: [product.rankingInGroup],
                proddescription: [product.proddescription],
                productonhold: [product.productonhold],
                batchRanking: [product.batchRanking],
                packaging: [product.packaging],
                brand: [product.brand],
                unitWeight: [product.unitWeight],
                lugSize: [product.lugSize],
            });
    }

    createProductGroupid() {
        return this.fb.group({
            id: [''],
            ID: [''],
            groupName: ['']
        });
    }

    getRouteInsertForm() {
        this.addRoutePrimaryFields();
        return this.routeForm;
    }

    private addRoutePrimaryFields() {
        this.routeForm = this.fb.group({
            routeName: ['', [Validators.required, Validators.minLength(3)]],
            routeid: ['', [Validators.required, Validators.minLength(1)]],
            productUnitMeasurement: ['', [Validators.required, Validators.minLength(1)]],
        });
    }

}
