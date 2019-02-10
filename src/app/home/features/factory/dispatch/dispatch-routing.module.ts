import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispatchEntryComponent } from './$dispatch-entry/dispatch-entry.component';
import { DispatchMenuComponent } from './$dispatch-menu/dispatch-menu.component';
import { ChangeTestDataComponent } from './changeTest/changeTest-data/change-test-data.component';


const dispatchRoutes: Routes = [
    {
        path: '',  // dispatch
        component: DispatchEntryComponent,
        children: [
            {
                path: 'menu',
                component: DispatchMenuComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'load-trucks',
                loadChildren: './dispatch-load-trucks/dispatch-load-trucks.module#DispatchLoadTrucksModule',
            },
            {
                path: 'test',
                component: ChangeTestDataComponent,
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(dispatchRoutes)],
  exports: [RouterModule]
})
export class DispatchRoutingModule { }
