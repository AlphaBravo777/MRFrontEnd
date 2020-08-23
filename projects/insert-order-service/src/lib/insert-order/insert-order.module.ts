import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertOrderDataComponent } from './2#insert-order-data/insert-order-data.component';
import { InsertOrderMainViewComponent } from './3#insert-order-main-view/insert-order-main-view.component';
import { TopMenuViewComponent } from './3#insert-order-main-view/1#top-menu-view/top-menu-view.component';
import { RouteViewComponent } from './3#insert-order-main-view/2#route-view/route-view.component';
import { AccountViewComponent } from './3#insert-order-main-view/3#account-view/account-view.component';
import { InsertProductViewComponent } from './3#insert-order-main-view/4#products-view/insert-products-view/insert-product-view.component';
import { ProductsAvailableViewComponent
    } from './3#insert-order-main-view/4#products-view/products-available-view/products-available-view.component';
import { ProductHistoryComponent } from './3#insert-order-main-view/4#products-view/product-history/product-history.component';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputBoxFocusDirective } from './1#insert-order-services/input-box-focus.directive';
import { AmountUnitSelectionComponent
    } from './3#insert-order-main-view/2#route-view/amount-unit-selection/amount-unit-selection.component';
import { ChangeDateViewComponent } from './3#insert-order-main-view/5#change-date-view/change-date-view.component';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';

@NgModule({
    declarations: [
        InsertOrderMainViewComponent,
        TopMenuViewComponent,
        RouteViewComponent,
        AccountViewComponent,
        InsertProductViewComponent,
        ProductsAvailableViewComponent,
        InsertOrderDataComponent,
        ProductHistoryComponent,
        InputBoxFocusDirective,
        AmountUnitSelectionComponent,
        ChangeDateViewComponent
    ],
    imports: [
        CommonModule,
        CustomMaterialModule,
        SharedComponentsModule,
        ReactiveFormsModule,
        MaterialConfigModule
    ]
})
export class InsertOrderModule {}
