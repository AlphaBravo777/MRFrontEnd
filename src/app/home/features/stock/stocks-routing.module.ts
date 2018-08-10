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
<<<<<<< HEAD
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
=======
        // canActivate: [AuthGuard],
        children: [
            {
                path: 'stock-taking',
                component: UnderConstructionComponent,
                // canActivate: [AuthGuard],
>>>>>>> 4d77b00... Just before trying to make authService work better
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
