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
            },
            {
                path: 'create-stock-take',
                loadChildren: () => import('./stock-take-create/stock-take-create.module').then(m => m.StockTakeCreateModule)
            },
            {
                path: 'total-production-stock',
                loadChildren: () => import('./total-stock-display/total-stock-display.module').then(m => m.TotalStockDisplayModule)
            },
            {
                path: 'total-raw_material-stock',
                loadChildren: () => import('./raw-material-stock-take/raw-material-stock-take.module').then(m => m.RawMaterialStockTakeModule)
            },
            {
                path: 'create-raw-material-stock-take',
                loadChildren: () => import('./raw-material-stock-take/raw-material-stock-take.module').then(m => m.RawMaterialStockTakeModule)
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
