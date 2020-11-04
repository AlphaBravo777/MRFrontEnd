import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionStockTakeRoutingModule } from './production-stock-take-routing.module';
import { ProductionStockDataComponent } from './2#production-stock-data/production-stock-data.component';
import { ProductionStockViewComponent } from './3#production-stock-view/production-stock-view.component';
import { StockItemsComponent } from './3#production-stock-view/stock-items/stock-items.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';
import { StockBatchesComponent } from './3#production-stock-view/stock-batches/stock-batches.component';
import { CreateBatchModule } from 'projects/production-service/src/public-api';


@NgModule({
    declarations: [
        ProductionStockDataComponent, ProductionStockViewComponent, StockItemsComponent, StockBatchesComponent
    ],
    imports: [
        CommonModule,
        ProductionStockTakeRoutingModule,
        ReactiveFormsModule,
        MaterialConfigModule,
        CreateBatchModule,
    ]
})
export class ProductionStockTakeModule { }
