import { Injectable } from '@angular/core';
import { InsertFormChangesService } from '../../../1#insert-order-services/insert-form-changes.service';
import { InsertOrderData$Service } from '../../../1#insert-order-services/insert-order-data$.service';
import { take, tap } from 'rxjs/operators';
import { IProductDetails } from 'src/app/home/shared/services/productServices/products-interface';
import { FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ProductValidationService {

    constructor(
        private insertFormChangesService: InsertFormChangesService,
        private insertOrderData$Service: InsertOrderData$Service) {}

    checkProductMRidValidation(value: string, index: number, orders: FormControl) {
        this.insertOrderData$Service.productListToPickFrom$.pipe(
            take(1),
            tap(data => {
                if (this.productInList(value, data)[0] && this.productUnique(value, orders)) {
                    this.insertFormChangesService.changeProductMRidValidation(true, index);
                } else {
                    this.insertFormChangesService.changeProductMRidValidation(false, index);
                }
            }),
        ).subscribe();
    }

    productInList(value: string, data: IProductDetails[]): [boolean, IProductDetails?] {
        for (let index = 0; index < data.length; index++) {
            if (value === data[index].productMRid) {
                return [true, data[index]];
            }
        }
        return [false];
    }

    productUnique(value: string, orders: FormControl) {
        let sameOrders = 0;
        let a = 0;
        for (const control of orders['controls']) {
            if (control.value.productMRid === value) {
                sameOrders += 1;
            }
            a += 1;
        }
        return sameOrders <= 1;
    }

}
