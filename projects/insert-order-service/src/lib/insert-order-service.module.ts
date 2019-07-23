import { NgModule } from '@angular/core';
import {
    InsertOrderServiceRoutingComponent,
    InsertOrderServiceRoutingModule
} from './insert-order-service-routing.module';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { InsertOrderMainViewComponent } from './insert-order/3#insert-order-main-view/insert-order-main-view.component';
import { TopMenuViewComponent } from './insert-order/3#insert-order-main-view/1#top-menu/top-menu-view.component';
import { RouteViewComponent } from './insert-order/3#insert-order-main-view/2#route-view/route-view.component';
import { AccountViewComponent } from './insert-order/3#insert-order-main-view/3#account-view/account-view.component';
import { InsertProductViewComponent } from './insert-order/3#insert-order-main-view/4#products-view/insert-products-view/insert-product-view.component';
import { ProductsAvailableViewComponent } from './insert-order/3#insert-order-main-view/4#products-view/products-available-view/products-available-view.component';

@NgModule({
    declarations: [
        InsertOrderServiceRoutingComponent,
        InsertOrderMainViewComponent,
        TopMenuViewComponent,
        RouteViewComponent,
        AccountViewComponent,
        InsertProductViewComponent,
        ProductsAvailableViewComponent,
    ],
    imports: [
        InsertOrderServiceRoutingModule,
        CommonModule,
        CustomMaterialModule
    ],
    exports: []
})
export class InsertOrderServiceModule {}
