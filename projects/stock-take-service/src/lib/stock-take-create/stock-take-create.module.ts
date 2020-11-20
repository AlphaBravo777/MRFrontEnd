import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockTakeCreateRoutingModule } from './stock-take-create-routing.module';
import { StockTakeCreateDataComponent } from './2#stock-create-data/stock-take-create-data.component';
import { StockTakeCreateViewComponent } from './3#stock-create-view/stock-take-create-view.component';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';
import { NewStockTakeFormComponent } from './3#stock-create-view/new-stock-take-form/new-stock-take-form.component';
import { NgStackFormsModule } from '@ng-stack/forms';


@NgModule({
    declarations: [StockTakeCreateDataComponent, StockTakeCreateViewComponent, NewStockTakeFormComponent],
    imports: [
        CommonModule,
        StockTakeCreateRoutingModule,
        MaterialConfigModule,
        NgStackFormsModule
    ]
})
export class StockTakeCreateModule { }
