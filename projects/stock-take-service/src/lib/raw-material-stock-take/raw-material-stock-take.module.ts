import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';

import { RawMaterialStockTakeRoutingModule } from './raw-material-stock-take-routing.module';
import { RawMaterialStockTakeDataComponent } from './2#raw-material-stock-take-data/raw-material-stock-take-data.component';
import { RawMaterialStockTakeViewComponent } from './3#raw-material-stock-take-view/raw-material-stock-take-view.component';


@NgModule({
  declarations: [RawMaterialStockTakeDataComponent, RawMaterialStockTakeViewComponent],
  imports: [
    CommonModule,
    RawMaterialStockTakeRoutingModule,
    SharedComponentsModule
  ]
})
export class RawMaterialStockTakeModule { }
