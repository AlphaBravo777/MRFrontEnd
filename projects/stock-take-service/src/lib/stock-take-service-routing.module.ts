import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './#entry/entry.component';
import { MenuComponent } from './#menu/menu.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'entry/menu',
        pathMatch: 'full'
    },
    {
        path: 'entry',
        component: EntryComponent,
        children: [
            {
                path: 'menu',
                component: MenuComponent
            },
            {
                path: 'production-stock',
                loadChildren: () => import('./production-stock-take/production-stock-take.module').then(m => m.ProductionStockTakeModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockTakeServiceRoutingModule { }
export const StockTakeServiceRoutingComponent = [
    EntryComponent,
    MenuComponent,
];
