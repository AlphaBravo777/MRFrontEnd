import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HppSummaryDataComponent } from './2#hpp-summary-data/hpp-summary-data.component';

const hppSummary: Routes = [
    {
        path: '',  // summary
        component: HppSummaryDataComponent,
        // children: [
        //     {
        //         path: 'menu',
        //         component: HppMenuComponent,
        //         // canActivate: [AuthGuard],
        //     },
        //     {
        //         path: 'summary',
        //         loadChildren: './dispatch-load-trucks/dispatch-load-trucks.module#DispatchLoadTrucksModule',
        //     },
        // ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(hppSummary)],
  exports: [RouterModule]
})
export class HppSummaryRoutingModule { }
