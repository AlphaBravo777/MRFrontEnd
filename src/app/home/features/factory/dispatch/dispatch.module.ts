import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchRoutingModule } from './dispatch-routing.module';
import { DispatchEntryComponent } from './$dispatch-entry/dispatch-entry.component';
import { DispatchMenuComponent } from './$dispatch-menu/dispatch-menu.component';
import { PnpPalletsDataComponent } from './dispatch-pnp-pallets/2#pnp-pallets-data/pnp-pallets-data.component';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { PnpPalletsView2Component } from './dispatch-pnp-pallets/3b#pnp-pallets-view2/pnp-pallets-view2.component';
import { PnpPalletsRegionsComponent } from './dispatch-pnp-pallets/4#pnp-pallets-regions/pnp-pallets-regions.component';
import { PnpPalletsSummaryComponent } from './dispatch-pnp-pallets/5#pnp-pallets-summary/pnp-pallets-summary.component';
import { PnpPalletsOrderMatrixComponent } from './dispatch-pnp-pallets/6#pnp-pallets-order-matrix/pnp-pallets-order-matrix.component';

@NgModule({
    declarations: [
        DispatchEntryComponent,
        DispatchMenuComponent,
        PnpPalletsDataComponent,
        PnpPalletsView2Component,
        PnpPalletsRegionsComponent,
        PnpPalletsSummaryComponent,
        PnpPalletsOrderMatrixComponent,
    ],
    imports: [
        CommonModule,
        DispatchRoutingModule,
        CustomMaterialModule
    ]
})
export class DispatchModule { }
