import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksRoutingModule, StocksRoutingComponent} from './stocks-routing.module';
import { StockProductsComponent } from './processed/get-products/stock-products/stock-products.component';
import { IndStockProdComponent } from './processed/get-products/ind-stock-prod/ind-stock-prod.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndStockTableComponent } from './processed/get-products/ind-stock-table/ind-stock-table.component';
import { IndStockProd2Component } from './processed/get-products/ind-stock-prod2/ind-stock-prod2.component';
import { IndStockContainerComponent } from './processed/get-products/ind-stock-prod2/ind-stock-container/ind-stock-container.component';
import { MyInputDirective } from './stock-services/my-input.directive';
import { ProcessedMenuComponent } from './processed/processed-menu/processed-menu.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonColorDirective } from './stock-services/button-color.directive';
import { StocksComponent } from './stocks.component';
import { StockGroupDirective } from './stock-services/stock-group.directive';
import { MaterialConfigModule } from '../../../material-config/material-config.module';
import { FilterTimesPipe } from './processed/processed-menu/filter-times.pipe';

@NgModule({
    imports: [
        MaterialConfigModule,
        CommonModule,
        StocksRoutingModule,
        ReactiveFormsModule,
        NgxPermissionsModule.forChild()
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
        StockGroupDirective,
        StocksComponent,
        FilterTimesPipe,
    ],
    providers: []
})
export class StocksModule {}
