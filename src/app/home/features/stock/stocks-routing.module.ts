import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GetProductsComponent } from './processed/get-products/get-products.component';
import { AuthGuard } from '../admin/admin-services/auth.guard';
import { ProductMaintenanceComponent } from './processed/product-maintenance/product-maintenance.component';
import { StockMenuComponent } from './$stock-menu/stock-menu.component';
import { StockEntryComponent } from './$stock-entry/stock-entry.component';

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
                path: 'stock-processed',
                loadChildren: () => import('./processed/processed.module').then(m => m.ProcessedModule),
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
