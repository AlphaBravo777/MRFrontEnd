import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './#entry/entry.component';
import { MenuComponent } from './#menu/menu.component';
import { SmallStockTakeComponent } from './product-small-stocktake/small-stock-take/small-stock-take.component';


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
                loadChildren: () => import('./insert-product/insert-product.module').then(m => m.InsertProductModule),
            },
            {
                path: 'stock-take',
                component: SmallStockTakeComponent
            },
            {
                path: 'create-batch-group',
                loadChildren: () => import('./insert-batch-group/insert-batch-group.module').then(m => m.InsertBatchGroupModule),
            }
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
