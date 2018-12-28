import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRawMaterialComponent } from './main-raw-material.component';
import { RawStockViewDataComponent } from './stock-view/raw-stock-view-data/raw-stock-view-data.component';
import { RawStockTakeDataComponent } from './stock-take/raw-stock-take-data/raw-stock-take-data.component';

// stock-raw/stocks-raw-view'
const rawProdRoutes: Routes = [
    {
        path: '',
        // component: MainRawMaterialComponent,
        children: [
            {
                path: 'stocks-raw-view',
                component: RawStockViewDataComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'stocktake-raw',
                component: RawStockTakeDataComponent,
            },
            // {
            //     path: 'something',
            //     component: MainRawMaterialComponent,
            // },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(rawProdRoutes)],
  exports: [RouterModule]
})
export class RawMaterialRoutingModule { }

export const RawMaterialRoutingComponents = [MainRawMaterialComponent];
