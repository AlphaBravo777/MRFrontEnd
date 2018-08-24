import { Component, OnInit } from '@angular/core';
import { StockAPIService } from '../../stock-services/stock-api.service';
import { forkJoin } from 'rxjs';
import { IProdDeleteGroups, IProductDetails, IProductContainers } from '../../stock-services/Stock';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'app-product-maintenance',
    templateUrl: './product-maintenance.component.html',
    styleUrls: ['./product-maintenance.component.css']
})
export class ProductMaintenanceComponent implements OnInit {

    constructor(private stockAPI: StockAPIService, private fb: FormBuilder) { }

    deleteForm: FormGroup;

    ngOnInit() {
        this.stockAPI.getProductContainers().subscribe(value => {
            console.log(value);
            this.deleteForm = this.fb.group({
                prodDetails: this.fb.array([])
            });
            this.setProducts(value);

        });
    }

    setProducts(data) {
        const control = <FormArray>this.deleteForm.controls.prodDetails;
        data.forEach(x => {
            control.push(this.fb.group({
                productid: x.productid,
                container: x.container,
                delete: x.deleteContainerAmount,
                id: x.id
            }));
        });
    }

    deleteFormSubmit(arrayNumber) {
        console.log('The number that was picked = ', arrayNumber);
        console.log(<FormArray>this.deleteForm.controls.prodDetails.value[arrayNumber].id);
        const value = <FormArray>this.deleteForm.controls.prodDetails.value[arrayNumber];
        const id = <FormArray>this.deleteForm.controls.prodDetails.value[arrayNumber].id;
        // tslint:disable-next-line
        this.stockAPI.updateProcessedStockContainerDelete(id, value).subscribe();
    }


}
