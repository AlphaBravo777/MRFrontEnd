import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcStockTakeDataComponent } from './stock-take/proc-stock-take-data/proc-stock-take-data.component';
import { PsRankingDataComponent } from './stock-take/proc-stock-ranking/ps-ranking-data/ps-ranking-data.component';

const processedProdRoutes: Routes = [
    {
        path: '',
        // component: MainRawMaterialComponent,
        children: [
            {
                path: 'stocktake-processed',
                component: ProcStockTakeDataComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'stocktake-processed-view',
                component: ProcStockTakeDataComponent,
            },
            {
                path: 'proc-stock-ranking',
                component: PsRankingDataComponent,
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(processedProdRoutes)],
  exports: [RouterModule]
})

export class ProcessedRoutingModule { }
