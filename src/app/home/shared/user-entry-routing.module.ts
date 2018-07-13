import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocksComponent } from '../features/stock/stocks.component';
import { UserEntryComponent } from './user-entry.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { FactoryComponent } from '../features/factory/factory.component';
import { GetProductsComponent } from '../features/stock/processed/get-products/get-products.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';


const userEntryRoutes: Routes = [
    {
        path: 'user',
        component: UserEntryComponent,
        children: [
            {
                path: 'user',
                component: UserNavComponent,
            },
            {
                path: 'user-nav',
                component: UserNavComponent,
            },
            {
                path: 'stocks',
                component: StocksComponent,
            },
            {
                path: 'L-shape',
                component: UnderConstructionComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(userEntryRoutes)],
    exports: [RouterModule]
})
export class UserEntryRoutingModule { }
