import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocksComponent } from '../features/stock/stocks.component';
import { UserEntryComponent } from './user-entry.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { FactoryComponent } from '../features/factory/factory.component';
import { GetProductsComponent } from '../features/stock/processed/get-products/get-products.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { AuthGuard } from '../features/admin/auth.guard';


const userEntryRoutes: Routes = [
    {
        path: 'user',
        component: UserEntryComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'user',
                component: UserNavComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'user-nav',
                component: UserNavComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'stocks',
                component: StocksComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'L-shape',
                component: UnderConstructionComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(userEntryRoutes)],
    exports: [RouterModule]
})
export class UserEntryRoutingModule { }
