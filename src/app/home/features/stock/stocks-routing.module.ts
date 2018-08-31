import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GetProductsComponent } from './processed/get-products/get-products.component';
import { UserEntryComponent } from '../../shared/user-entry.component';
import { UnderConstructionComponent } from '../../shared/under-construction/under-construction.component';
import { AuthGuard } from '../admin/auth.guard';
import { ProductMaintenanceComponent } from './processed/product-maintenance/product-maintenance.component';

const stockRoutes: Routes = [
    {
        path: 'user',
        component: UserEntryComponent,
        children: [
            {
                path: 'stocks-raw',
                // loadChildren: () => RawMaterialModule,
                loadChildren: './raw_material/raw-material.module#RawMaterialModule'
                // canActivate: [AuthGuard],
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
