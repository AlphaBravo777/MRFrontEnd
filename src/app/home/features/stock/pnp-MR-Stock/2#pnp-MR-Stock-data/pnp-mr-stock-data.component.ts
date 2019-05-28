import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PnpMrStockService } from '../1#pnp-MR-Stock-services/pnp-mr-stock.service';

@Component({
    selector: 'app-pnp-mr-stock-data',
    templateUrl: './pnp-mr-stock-data.component.html',
    styleUrls: ['./pnp-mr-stock-data.component.scss']
})
export class PnpMRStockDataComponent implements OnInit, OnDestroy {

    pnpStockForm: FormGroup;
    allPnPProducts;
    subscription2: Subscription;
    subscription: Subscription;
    formBatchesNamesValid = false;

    constructor(private fb: FormBuilder, private pnpMRStockService: PnpMrStockService) {}

    ngOnInit() {
        this.getAllPnPProducts();
    }

    getAllPnPProducts() {
        this.pnpMRStockService.getAllPnPStock().subscribe(data => {
                this.allPnPProducts = data;
                this.buildform();
            });
    }

    buildform() {
        this.pnpStockForm = this.fb.group({
            batches: this.fb.array([]),
            products: this.fb.array([])
        });
        this.createBatch('');
        this.insertProduct();
        this.onFormChanges();
    }

    createBatch(batchNumber) {
        const control = <FormArray>this.pnpStockForm.controls.batches;
        control.push(this.fb.group({
            batchNumber: [batchNumber],
        }));
    }

    insertProduct() {
        const control = <FormArray>this.pnpStockForm.controls.products;
        for (let prod = 0; prod < this.allPnPProducts.length; prod++) {
            control.push(this.fb.group({
                productid: [this.allPnPProducts[prod].productid],
                productMRid: [this.allPnPProducts[prod].productMRid],
                batchGroupid: [this.allPnPProducts[prod].batchGroupid],
                amounts: this.createAmounts()
            }));
        }

    }

    createAmounts(): FormArray  {
        const control = new FormArray([]);
        control.push(this.fb.group({
            amount: [''],
            batchNumber: [''],
        }));
        return control;
    }

    onFormChanges(): void {
        this.subscription2 = this.pnpStockForm.valueChanges.subscribe(form => {
            // const ordersLength = form.products.length;
            this.checkBatchNames(form);
        });
    }

    checkBatchNames(form) {
        // console.log(form.batches);
        for (let bat = 0; bat < form.batches.length; bat++) {
            const batchName = form.batches[bat].batchNumber;
            if (batchName.length !== 4) {
                console.log('Not correct');
                this.formBatchesNamesValid = false;
            } else {
                if (batchName[2] !== ':') {
                    this.formBatchesNamesValid = false;
                } else {
                this.formBatchesNamesValid = true;
                }
            }
            // console.log(batchName);
        }
    }

    addBatch(event) {
        // Look for the productBatchNumberid and add it here somewhere

        console.log('A new batch will now be created');
        this.createBatch('');
        for (let prod = 0; prod < this.pnpStockForm.get('products').value.length; prod++) {
            for (let batch = 0; batch < this.pnpStockForm.get('batches').value.length; batch++) {
                if (!this.pnpStockForm.get('products').value[prod].amounts[batch]) {
                    const control = <FormArray>this.pnpStockForm.get('products')['controls'][prod].controls.amounts;
                    control.push(this.fb.group({
                        amount: [''],
                        batchNumber: [''],
                    }));
                    // console.log('The control at the moment = ', control);
                }
            }
        }
    }

    pnpStockFormSubmit() {
        for (let prod = 0; prod < this.pnpStockForm.get('products').value.length; prod++) {
            for (let batch = 0; batch < this.pnpStockForm.get('batches').value.length; batch++) {
                this.pnpStockForm.get('products').value[prod].amounts[batch].batchNumber =
                this.pnpStockForm.get('batches').value[batch].batchNumber;
            }
        }
        console.log('The submitted data = ', this.pnpStockForm.value.products);
        this.subscription = this.pnpMRStockService.submitPnPStock(this.pnpStockForm).subscribe();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
