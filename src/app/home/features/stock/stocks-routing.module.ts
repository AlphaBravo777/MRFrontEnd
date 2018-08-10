import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GetProductsComponent } from './processed/get-products/get-products.component';
import { UserEntryComponent } from '../../shared/user-entry.component';
import { UnderConstructionComponent } from '../../shared/under-construction/under-construction.component';
import { AuthGuard } from '../admin/auth.guard';

const stockRoutes: Routes = [
    {
        path: 'user',
        component: UserEntryComponent,
        children: [
            {
                path: 'stock-taking',
                component: UnderConstructionComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'processed/:time',
                component: GetProductsComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(stockRoutes)],
    exports: [RouterModule]
})
export class StocksRoutingModule { }
