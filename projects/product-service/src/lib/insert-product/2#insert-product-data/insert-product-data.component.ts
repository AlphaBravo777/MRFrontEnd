import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPackaging, IDepartment, ICategory, IGroup, IMeasuringUnit, IItemVendor } from '../../#shared-services/interfaces/auxiliary';
import { IItemBasic } from '../../#shared-services/interfaces/item';
import { Subscription, Observable } from 'rxjs';
import { ProductService } from '../../#shared-services/product.service';
import { tap, concatMap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'mr-product-insert-product-data',
    templateUrl: './insert-product-data.component.html',
    styleUrls: ['./insert-product-data.component.scss']
})
export class InsertProductDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    itemsBasic: IItemBasic[];
    packagings: IPackaging[];
    departments: IDepartment;
    categories: ICategory;
    groups: IGroup;
    measureUnits: IMeasuringUnit[];
    itemVendors: IItemVendor;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.subscription = this.getData().subscribe();
    }

    getData(): Observable<any> {
        return this.productService.getAllItemsBasicInfo().pipe(
            tap(itemsBasic => this.itemsBasic = itemsBasic),
            concatMap(() => this.productService.getMeasuringUnits()),
            tap(measuringUnits => this.measureUnits = measuringUnits),
            concatMap(() => this.productService.getPackaging()),
            tap(packaging => this.packagings = packaging),
            concatMap(() => this.productService.getItemVendors()),
            tap(vendors => this.itemVendors = vendors),
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
