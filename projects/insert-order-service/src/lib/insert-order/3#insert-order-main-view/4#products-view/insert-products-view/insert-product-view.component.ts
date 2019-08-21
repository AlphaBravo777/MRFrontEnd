import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormArray, FormGroupDirective } from '@angular/forms';
import { IColorChangeInputBoxInterface } from 'src/app/home/shared/components/shared-components-interface';
import { ProductValidationService } from './product-validation.service';
import { InsertFormChangesService } from '../../../1#insert-order-services/insert-form-changes.service';
import { OrderService } from 'projects/insert-order-service/src/lib/#sharedServices/order.service';
import { IProductOrderDetails, IProductDetails } from 'src/app/home/shared/services/productServices/products-interface';

@Component({
    selector: 'mr-insert-insert-product-view',
    templateUrl: './insert-product-view.component.html',
    styleUrls: ['./insert-product-view.component.scss']
})
export class InsertProductViewComponent implements OnInit {

    @Input() productsOrderedFormControl: FormControl;
    @Input() controlPath: any;

    colorChangeInputBoxData: IColorChangeInputBoxInterface = {
        inputBoxStyle: {
        'margin-right': '10px',
        'width': '100px',
        'height': '30px',
        'padding': '0px 10px',
        'border-radius': '6px',
        'border': 'none',
        'color': '#0F0D0D',
        'font-size': '1.3em',
        'font-weight': 'bold',
        'background-color': 'thirdColorMinusOne',
        // tslint:disable-next-line
        'box-shadow': '0 -2px 2px 0 rgba(199, 199, 199, 0.55), 0 1px 1px 0 #fff, 0 2px 2px 1px #fafafa, 0 2px 4px 0 #b2b2b2 inset, 0 -1px 1px 0 #f2f2f2 inset, 0 15px 15px 0 rgba(41, 41, 41, 0.09) inset',
        },
    };
    controller: FormArray;

    constructor(private fgd: FormGroupDirective,
        private productValidationService: ProductValidationService,
        private insertFormChangesService: InsertFormChangesService,
        private insertOrderService: OrderService) {}

    ngOnInit() {
        console.log('insert Products', this.productsOrderedFormControl);
        this.controller = this.fgd.control.get(
            this.controlPath
          ) as FormArray;
    }

    deleteProduct(index: number) {
        // Check if product has an orderid, true = send request to backend to delete product
        const amountid = this.insertFormChangesService.deleteOrder(index);
        if (amountid) {
            this.insertOrderService.deleteProductFromOrder(amountid);
        }
        console.log('Alpha(Remove order) = ', amountid);
    }

    productMRidInput(value: string, index: number) {
        this.productValidationService.checkProductMRidValidation(value, index, this.productsOrderedFormControl);
    }

    productAmountInput(value: string, index: number) {

    }

    addProduct() {
        const product: IProductDetails = {
            productMRid: null,
            productid: null,
            lugSize: null,
            packageWeight: null,
            rankingInGroup: null,
        };
        this.insertFormChangesService.removeAnyOrderedProductsFromAvailableList();
        this.insertFormChangesService.addAvailableProductToOrderedProducts(product);
    }


}
