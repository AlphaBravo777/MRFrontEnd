import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawMaterialModule } from './raw_material/raw-material.module';
import { StocksRoutingModule, StocksRoutingComponent } from './stocks-routing.module';
import { StockProductsComponent } from './processed/get-products/stock-products/stock-products.component';
import { IndStockProdComponent } from './processed/get-products/ind-stock-prod/ind-stock-prod.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndStockTableComponent } from './processed/get-products/ind-stock-table/ind-stock-table.component';
import { IndStockProd2Component } from './processed/get-products/ind-stock-prod2/ind-stock-prod2.component';
import { IndStockContainerComponent } from './processed/get-products/ind-stock-prod2/ind-stock-container/ind-stock-container.component';
import { MyInputDirective } from './stock-services/my-input.directive';
import { ProcessedMenuComponent } from './processed/processed-menu/processed-menu.component';
import { MatMenuModule, MatListModule, MatIconModule } from '@angular/material';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonColorDirective } from './stock-services/button-color.directive';
import { StocksComponent } from './stocks.component';
import { MainRawMaterialComponent } from './raw_material/main-raw-material.component';

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
    ],
  })
  export class MaterialModule {}

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    RawMaterialModule,
    StocksRoutingModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forChild(),
  ],
  declarations: [
      StocksRoutingComponent,
      StockProductsComponent,
      IndStockProdComponent,
      IndStockTableComponent,
      IndStockProd2Component,
      IndStockContainerComponent,
      MyInputDirective,
      ProcessedMenuComponent,
      ButtonColorDirective,
      StocksComponent,
      MainRawMaterialComponent,
  ],
  providers: [
  ]
})
export class StocksModule { }
