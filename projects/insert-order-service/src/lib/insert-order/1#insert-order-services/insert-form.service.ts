import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class InsertFormService {

    insertForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    getInsertForm(): FormGroup {
        this.addPrimaryFields();
        return this.insertForm;
    }

    private addPrimaryFields() {
        this.insertForm = this.fb.group({
            accountsid: [''],
            accountID: [''],
            accountMRid: [''],
            accountName: [''],
            commonName: [''],
            parentAccountid: [''],
            routeName: ['Test Route'],
            routeid: [''],
            orderNumber: [''],
            orderDate: [''],
            timeStampid: [''],
            userid: [''],
            orders: this.fb.array([])
        });
        this.insertProductFields();
    }

    private insertProductFields() {
        const control = <FormArray>this.insertForm.controls.orders;
        control.push(this.fb.group({
            productMRid: [''],
            productid: [''],
            packageWeight: [''],
            rankingInGroup: [''],
            proddescription: [''],
            productonhold: [''],
            batchRanking: [''],
            packaging: [''],
            brand: [''],
            unitWeight: [''],
            lugSize: [''],
            amount: [''],
            orderDetailsid: [''],
            userid: [''],
            })
        );
    }

}
