import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HppMenuComponent } from './$hpp-menu/hpp-menu.component';
import { HppEntryComponent } from './$hpp-entry/hpp-entry.component';
import { HppTransferPrePostDataComponent } from './hpp-stock-transfer/2a#hpp-transfer-pre-post-data/hpp-transfer-pre-post-data.component';
import { HppTransferPostLeakerDataComponent
} from './hpp-stock-transfer/2b#hpp-transfer-post-leaker-data/hpp-transfer-post-leaker-data.component';


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
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(dispatchRoutes)],
  exports: [RouterModule]
})
export class HppRoutingModule { }
