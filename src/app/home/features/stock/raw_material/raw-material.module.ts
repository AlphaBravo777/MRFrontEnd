import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CustomMaterialModule } from '../../../shared/dropdown-table/custom-material.module';
import { RawMaterialRoutingModule } from './raw-material-routing.module';

import { MainRawMaterialComponent } from './main-raw-material.component';
import { RawMaterialViewComponent } from './stock-view/raw-material-view/raw-material-view.component';
import { RawMaterialView1Component } from './stock-view/raw-material-view1/raw-material-view1.component';
import { RawMaterialView2Component } from './stock-view/raw-material-view2/raw-material-view2.component';
import { RawStockViewDataComponent } from './stock-view/raw-stock-view-data/raw-stock-view-data.component';
import { RawStockTakeDataComponent } from './stock-take/raw-stock-take-data/raw-stock-take-data.component';
import { RawStockTakeViewComponent } from './stock-take/raw-stock-take-view/raw-stock-take-view.component';

@NgModule({
  imports: [
    CommonModule,
    RawMaterialRoutingModule,
    SharedModule,
    CustomMaterialModule,
  ],
  declarations: [
    MainRawMaterialComponent,
    RawMaterialViewComponent,
    RawMaterialView1Component,
    RawMaterialView2Component,
    RawStockViewDataComponent,
    RawStockTakeDataComponent,
    RawStockTakeViewComponent
]
})
export class RawMaterialModule { }
