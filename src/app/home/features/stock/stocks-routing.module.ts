import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GetProductsComponent } from './processed/get-products/get-products.component';
import { UserEntryComponent } from '../../shared/user-entry/user-entry.component';
import { AuthGuard } from '../admin/admin-services/auth.guard';
import { ProductMaintenanceComponent } from './processed/product-maintenance/product-maintenance.component';
import { StocksComponent } from './stocks.component';

const stockRoutes: Routes = [
    {
        path: '',
        component: StocksComponent,
        children: [
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
                path: 'stock-hpp',
                loadChildren: './hpp/hpp-stock.module#HppStockModule',
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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(stockRoutes)],
    exports: [RouterModule]
})
export class StocksRoutingModule { }
export const StocksRoutingComponent = [GetProductsComponent, ProductMaintenanceComponent];
