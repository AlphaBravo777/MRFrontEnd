import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './#menu/menu.component';
import { AddAccountDataComponent } from './add-account/2#add-account-data/add-account-data.component';

const accountServiceRoutes: Routes = [
    {
        path: '',
        redirectTo: 'entry/menu',
        pathMatch: 'full'
    },
    {
        path: 'entry',
        children: [
            {
                path: 'menu',
                component: MenuComponent
            },
            {
                path: 'add-account',
                component: AddAccountDataComponent
            },
            // {
            //     path: 'view-orders',
            //     loadChildren: () => import('./view-orders/view-orders.module').then(m => m.ViewOrdersModule)
            // },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(accountServiceRoutes)],
    exports: [RouterModule],
    providers: []
})
export class AccountsServiceRoutingModule {}
