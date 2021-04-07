import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { InsertFormChangesService } from '../../../1#insert-order-services/insert-form-changes.service';
import { IProductDetails } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';

@Component({
    selector: 'mr-insert-products-available-view',
    templateUrl: './products-available-view.component.html',
    styleUrls: ['./products-available-view.component.scss']
})
export class ProductsAvailableViewComponent implements OnInit {

    @Input() productsAvailableFormControl: FormArray;

    constructor(private insertFormChangesService: InsertFormChangesService) {}

    ngOnInit() {

    }

    availableProductSelected(product: IProductDetails) {
        this.insertFormChangesService.addAvailableProductToOrderedProducts(product);
        // this.productValidationService.checkProductMRidValidation()
        console.log('This product was picked: ', product);
    }
}
