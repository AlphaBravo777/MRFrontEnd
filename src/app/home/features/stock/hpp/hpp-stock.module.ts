import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HppStockRoutingModule } from './hpp-stock-routing.module';
import { HppStockTakeView1Component } from './hpp-stock-take/hpp-stock-take-view1/hpp-stock-take-view1.component';
import { HppStockTakeDataComponent } from './hpp-stock-take/hpp-stock-take-data/hpp-stock-take-data.component';

@NgModule({
    declarations: [
        HppStockTakeView1Component,
        HppStockTakeDataComponent,
    ],
    imports: [
        CommonModule,
        HppStockRoutingModule
    ]
})
export class HppStockModule { }
