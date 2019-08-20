import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InsertFormChangesService } from '../../../1#insert-order-services/insert-form-changes.service';
import { IProductDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Component({
    selector: 'mr-insert-products-available-view',
    templateUrl: './products-available-view.component.html',
    styleUrls: ['./products-available-view.component.scss']
})
export class ProductsAvailableViewComponent implements OnInit {

    @Input() productsAvailableFormControl: FormControl;

    constructor(private insertFormChangesService: InsertFormChangesService) {}

    ngOnInit() {

    }

    availableProductSelected(product: IProductDetails) {
        this.insertFormChangesService.addAvailableProductToOrderedProducts(product);
        // this.insertFormChangesService.removeProductFromAvailableList(product);
        console.log('This product was picked: ', product);
    }
}
