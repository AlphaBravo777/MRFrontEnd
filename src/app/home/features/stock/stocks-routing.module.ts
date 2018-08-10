import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GetProductsComponent } from './processed/get-products/get-products.component';
import { UserEntryComponent } from '../../shared/user-entry.component';
import { UnderConstructionComponent } from '../../shared/under-construction/under-construction.component';

const stockRoutes: Routes = [
    {
        path: 'user',
        component: UserEntryComponent,
<<<<<<< HEAD
        children: [
            {
                path: 'stock-taking',
                component: UnderConstructionComponent
=======
        canActivate: [AuthGuard],
        children: [
            {
                path: 'stock-taking',
                component: UnderConstructionComponent,
                canActivate: [AuthGuard],
>>>>>>> 346651d... commit to change branch
            },
            {
                path: 'processed',
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
