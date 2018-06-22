import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks.component';
import { StocksRoutingModule } from './stocks-routing.module';
import { GetProductsComponent } from './processed/get-products/get-products.component';
import { StockTakingService } from './stock-services/stock-taking.service';
import { StockProductsComponent } from './processed/get-products/stock-products/stock-products.component';
import { StockBatchComponent } from './processed/get-products/stock-products/stock-batch/stock-batch.component';

@NgModule({
  imports: [
    CommonModule,
    StocksRoutingModule
  ],
  declarations: [
    StocksComponent,
    GetProductsComponent,
    StockProductsComponent,
    StockBatchComponent
  ],
  providers: [
    StockTakingService
  ]
})
export class StocksModule { }
