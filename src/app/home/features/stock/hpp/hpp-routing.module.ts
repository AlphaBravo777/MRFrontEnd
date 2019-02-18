import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HppMenuComponent } from './$hpp-menu/hpp-menu.component';
import { HppEntryComponent } from './$hpp-entry/hpp-entry.component';


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
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(dispatchRoutes)],
  exports: [RouterModule]
})
export class HppRoutingModule { }
