import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HppMenuComponent } from './$hpp-menu/hpp-menu.component';
import { HppEntryComponent } from './$hpp-entry/hpp-entry.component';
import { HppTransferPrePostDataComponent } from './hpp-stock-transfer/2a#hpp-transfer-pre-post-data/hpp-transfer-pre-post-data.component';
import { HppTransferPostLeakerDataComponent
} from './hpp-stock-transfer/2b#hpp-transfer-post-leaker-data/hpp-transfer-post-leaker-data.component';
import { HppTransferMrPreDataComponent } from './hpp-stock-transfer/2c#hpp-transfer-mr-pre-data/hpp-transfer-mr-pre-data.component';
import { HppTransferPostDeliveredComponent } from './hpp-stock-transfer/2d#hpp-transfer-post-delivered/hpp-transfer-post-delivered.component';



const dispatchRoutes: Routes = [
    {
        path: '',  // hpp
        component: HppEntryComponent,
        children: [
            {
                path: 'menu',
                component: HppMenuComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'summary',
                loadChildren: './hpp-summary/hpp-summary.module#HppSummaryModule',
            },
            {
                path: 'pre_post_transfer',
                component: HppTransferPrePostDataComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'post_leaker_transfer',
                component: HppTransferPostLeakerDataComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'mr_pre_transfer',
                component: HppTransferMrPreDataComponent,
            },
            {
                path: 'post_pnp_transfer',
                component: HppTransferPostDeliveredComponent,
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(dispatchRoutes)],
  exports: [RouterModule]
})
export class HppRoutingModule { }
