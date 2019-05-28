import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GetProductsComponent } from './processed/get-products/get-products.component';
import { AuthGuard } from '../admin/admin-services/auth.guard';
import { ProductMaintenanceComponent } from './processed/product-maintenance/product-maintenance.component';
import { StockMenuComponent } from './$stock-menu/stock-menu.component';
import { StockEntryComponent } from './$stock-entry/stock-entry.component';
import { PnpMRStockDataComponent } from './pnp-MR-Stock/2#pnp-MR-Stock-data/pnp-mr-stock-data.component';



const stockRoutes: Routes = [
    {
        path: '',  // stock
        component: StockEntryComponent,
        children: [
            {
                path: 'menu',
                component: StockMenuComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'stock-raw',
                loadChildren: './raw_material/raw-material.module#RawMaterialModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'stock-processed',
                loadChildren: './processed/processed.module#ProcessedModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'hpp',
                loadChildren: './hpp/hpp.module#HppModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'stocks-processed',
                component: GetProductsComponent
            },
            {
                path: 'productMaintenance',
                component: ProductMaintenanceComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'pnp-Meatrite-Stock',
                component: PnpMRStockDataComponent,
                canActivate: [AuthGuard],
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(stockRoutes)],
    exports: [RouterModule]
})
export class StocksRoutingModule { }
export const StocksRoutingComponent = [GetProductsComponent, ProductMaintenanceComponent];
