import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks.component';
import { StocksRoutingModule } from './stocks-routing.module';
import { GetProductsComponent } from './processed/get-products/get-products.component';
import { StockProductsComponent } from './processed/get-products/stock-products/stock-products.component';
import { IndStockProdComponent } from './processed/get-products/ind-stock-prod/ind-stock-prod.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndStockTableComponent } from './processed/get-products/ind-stock-table/ind-stock-table.component';
import { IndStockProd2Component } from './processed/get-products/ind-stock-prod2/ind-stock-prod2.component';
import { IndStockContainerComponent } from './processed/get-products/ind-stock-prod2/ind-stock-container/ind-stock-container.component';
import { MyInputDirective } from './stock-services/my-input.directive';
import { ProcessedMenuComponent } from './processed/processed-menu/processed-menu.component';
import { MatMenuModule, MatListModule, MatIconModule } from '../../../../../node_modules/@angular/material';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ProductMaintenanceComponent } from './processed/product-maintenance/product-maintenance.component';

@NgModule({
    exports: [
        MatMenuModule,
        MatListModule,
        MatIconModule,
    ],
    imports: [
        MatMenuModule,
        MatListModule,
        MatIconModule,
    ]
  })
  export class MaterialModule {}

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    StocksRoutingModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forChild(),
  ],
  declarations: [
    StocksComponent,
    GetProductsComponent,
    StockProductsComponent,
    IndStockProdComponent,
    IndStockTableComponent,
    IndStockProd2Component,
    IndStockContainerComponent,
    MyInputDirective,
    ProcessedMenuComponent,
    ProductMaintenanceComponent,
  ],
  providers: [
  ]
})
export class StocksModule { }
