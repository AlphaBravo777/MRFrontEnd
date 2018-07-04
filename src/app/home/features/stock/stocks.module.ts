import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks.component';
import { StocksRoutingModule } from './stocks-routing.module';
import { GetProductsComponent } from './processed/get-products/get-products.component';
import { StockTakingService } from './stock-services/stock-taking.service';
import { StockProductsComponent } from './processed/get-products/stock-products/stock-products.component';
import { IndStockProdComponent } from './processed/get-products/ind-stock-prod/ind-stock-prod.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StocksRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    StocksComponent,
    GetProductsComponent,
    StockProductsComponent,
    IndStockProdComponent,
  ],
  providers: [
    StockTakingService
  ]
})
export class StocksModule { }
