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
import { StockGroupDirective } from './stock-services/stock-group.directive';
import { MaterialConfigModule } from '../../../material-config/material-config.module';
import { FilterTimesPipe } from './processed/processed-menu/filter-times.pipe';
import { StockMenuComponent } from './$stock-menu/stock-menu.component';
import { StockEntryComponent } from './$stock-entry/stock-entry.component';
import { CustomMaterialModule } from '../../shared/dropdown-table/custom-material.module';

@NgModule({
    imports: [
        MaterialConfigModule,
        CommonModule,
        StocksRoutingModule,
        ReactiveFormsModule,
        CustomMaterialModule,
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
        FilterTimesPipe,
        StockMenuComponent,
        StockEntryComponent,
    ],
    providers: []
})
export class StocksModule {}
