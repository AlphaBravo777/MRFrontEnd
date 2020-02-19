import { NgModule } from '@angular/core';
import { ProductServiceRoutingModule, ProductServiceRoutingComponents } from './product-service-routing.module';
import { SmallStockTakeComponent } from './product-small-stocktake/small-stock-take/small-stock-take.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SmallStockFocusDirective } from './product-small-stocktake/services/small-stock-focus.directive';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';

@NgModule({
    declarations: [ProductServiceRoutingComponents, SmallStockTakeComponent, SmallStockFocusDirective],
    imports: [ProductServiceRoutingModule, ReactiveFormsModule, CommonModule, CustomMaterialModule
    ],
    exports: []
})
export class ProductServiceModule { }
