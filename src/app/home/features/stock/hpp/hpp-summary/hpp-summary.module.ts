import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';


import { HppSummaryRoutingModule } from './hpp-summary-routing.module';
import { HppSummaryDataComponent } from './2#hpp-summary-data/hpp-summary-data.component';
import { HppSummaryView1Component } from './3#hpp-summary-view1/hpp-summary-view1.component';

@NgModule({
    declarations: [HppSummaryDataComponent, HppSummaryView1Component],
    imports: [
        CommonModule,
        HppSummaryRoutingModule,
        CustomMaterialModule
    ]
})
export class HppSummaryModule {}
