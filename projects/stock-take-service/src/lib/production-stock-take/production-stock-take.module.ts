import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionStockTakeRoutingModule } from './production-stock-take-routing.module';
import { ProductionStockDataComponent } from './2#production-stock-data/production-stock-data.component';
import { ProductionStockViewComponent } from './3#production-stock-view/production-stock-view.component';


@NgModule({
    declarations: [
        ProductionStockDataComponent, ProductionStockViewComponent
    ],
    imports: [
        CommonModule,
        ProductionStockTakeRoutingModule
    ]
})
export class ProductionStockTakeModule { }
