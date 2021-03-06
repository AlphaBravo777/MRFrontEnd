import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TotalStockDisplayRoutingModule } from './total-stock-display-routing.module';
import { TotalStockDisplayDataComponent } from './2#total-stock-display-data/total-stock-display-data.component';
import { TotalStockDisplayViewComponent } from './3#total-stock-display-view/total-stock-display-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';
import { StockValueComponent } from './3#total-stock-display-view/stock-value/stock-value.component';


@NgModule({
  declarations: [
      TotalStockDisplayDataComponent,
      TotalStockDisplayViewComponent,
      StockValueComponent
  ],
  imports: [
    CommonModule,
    TotalStockDisplayRoutingModule,
    ReactiveFormsModule,
    MaterialConfigModule,
  ]
})
export class TotalStockDisplayModule { }
