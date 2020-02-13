import { NgModule } from '@angular/core';
import { ProductServiceRoutingModule, ProductServiceRoutingComponents } from './product-service-routing.module';
import { SmallStockTakeComponent } from './product-small-stocktake/small-stock-take/small-stock-take.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProductServiceRoutingComponents, SmallStockTakeComponent],
    imports: [ProductServiceRoutingModule, ReactiveFormsModule
    ],
    exports: []
})
export class ProductServiceModule { }
