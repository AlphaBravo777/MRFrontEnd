import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadTrucksDataComponent } from './2#load-trucks-data/load-trucks-data.component';

const loadTrucksRoutes: Routes = [
    {
        path: '',  // dispatch
        component: LoadTrucksDataComponent,
        // children: [
        //     {
        //         path: 'menu',
        //         component: DispatchMenuComponent,
        //         // canActivate: [AuthGuard],
        //     },
        //     {
        //         path: 'load-trucks',
        //         loadChildren: './dispatch-load-trucks/dispatch-load-trucks.module#DispatchLoadTrucksModule',
        //     },
        // ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(loadTrucksRoutes)],
  exports: [RouterModule]
})
export class DispatchLoadTrucksRoutingModule { }
