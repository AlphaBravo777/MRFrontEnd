import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './#entry/entry.component';
import { MenuComponent } from './#menu/menu.component';

const productServiceRoutes: Routes = [
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
                path: 'create-item',
                loadChildren: () => import('./insert-product/insert-product.module').then(m => m.InsertProductModule)
            }
            // {
            //     path: 'insertPnPCSV',
            //     component: InsertPnpCsvDataComponent
            // },
            // {
            //     path: 'view-orders',
            //     loadChildren: () => import('./view-orders/view-orders.module').then(m => m.ViewOrdersModule)
            // },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(productServiceRoutes)],
    exports: [RouterModule],
    providers: []
})
export class ProductServiceRoutingModule {}
export const ProductServiceRoutingComponents = [
    EntryComponent,
    MenuComponent,
];
