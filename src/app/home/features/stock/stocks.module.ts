import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks.component';
import { StocksRoutingModule } from './stocks-routing.module';
import { GetProductsComponent } from './processed/get-products/get-products.component';
import { StockTakingService } from './stock-services/stock-taking.service';
import { StockProductsComponent } from './processed/get-products/stock-products/stock-products.component';
import { IndStockProdComponent } from './processed/get-products/ind-stock-prod/ind-stock-prod.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndStockTableComponent } from './processed/get-products/ind-stock-table/ind-stock-table.component';
import { NumKeyboardComponent } from './processed/get-products/num-keyboard/num-keyboard.component';
import { IndStockProd2Component } from './processed/get-products/ind-stock-prod2/ind-stock-prod2.component';
import { IndStockContainerComponent } from './processed/get-products/ind-stock-prod2/ind-stock-container/ind-stock-container.component';
import { MyInputDirective } from './stock-services/my-input.directive';

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
    IndStockTableComponent,
    NumKeyboardComponent,
    IndStockProd2Component,
    IndStockContainerComponent,
    MyInputDirective,
  ],
  providers: [
    StockTakingService
  ]
})
export class StocksModule { }
