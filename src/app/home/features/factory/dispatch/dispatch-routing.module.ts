import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispatchEntryComponent } from './$dispatch-entry/dispatch-entry.component';
import { DispatchMenuComponent } from './$dispatch-menu/dispatch-menu.component';
import { PnpPalletsDataComponent } from './dispatch-pnp-pallets/2#pnp-pallets-data/pnp-pallets-data.component';
import { HppPalletsDataComponent } from './dispatch-hpp-pallets/2#hpp-pallets-data/hpp-pallets-data.component';


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
                path: 'pnp-pallets',
                component: PnpPalletsDataComponent,
            },
            {
                path: 'hpp-pallets',
                component: HppPalletsDataComponent,
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(dispatchRoutes)],
  exports: [RouterModule]
})
export class DispatchRoutingModule { }
