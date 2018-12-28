import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HppStockTakeDataComponent } from './hpp-stock-take/hpp-stock-take-data/hpp-stock-take-data.component';

const hppStockRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'hpp-stock',
                component: HppStockTakeDataComponent,
                // canActivate: [AuthGuard],
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(hppStockRoutes)],
  exports: [RouterModule]
})
export class HppStockRoutingModule { }
