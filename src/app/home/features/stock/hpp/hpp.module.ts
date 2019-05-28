import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HppRoutingModule } from './hpp-routing.module';
import { HppMenuComponent } from './$hpp-menu/hpp-menu.component';
import { HppEntryComponent } from './$hpp-entry/hpp-entry.component';
import { HppTransferPrePostDataComponent } from './hpp-stock-transfer/2a#hpp-transfer-pre-post-data/hpp-transfer-pre-post-data.component';
import { HppTransferPostLeakerDataComponent
} from './hpp-stock-transfer/2b#hpp-transfer-post-leaker-data/hpp-transfer-post-leaker-data.component';
import { HppStockTransferView1Component } from './hpp-stock-transfer/3#hpp-stock-transfer-view1/hpp-stock-transfer-view1.component';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { HppTransferButtonsComponent } from './hpp-stock-transfer/4#hpp-stock-buttons/hpp-transfer-buttons.component';
import { HppTransferMrPreDataComponent } from './hpp-stock-transfer/2c#hpp-transfer-mr-pre-data/hpp-transfer-mr-pre-data.component';
import { HppTransferPostDeliveredComponent } from './hpp-stock-transfer/2d#hpp-transfer-post-delivered/hpp-transfer-post-delivered.component';
import { HppTransferPostPnpDataComponent } from './hpp-stock-transfer/2e#hpp-transfer-post-hpp-data/hpp-transfer-post-pnp-data.component';

@NgModule({
  declarations: [
    HppMenuComponent,
    HppEntryComponent,
    HppTransferPrePostDataComponent,
    HppTransferPostLeakerDataComponent,
    HppStockTransferView1Component,
    HppTransferButtonsComponent,
    HppTransferMrPreDataComponent,
    HppTransferPostDeliveredComponent,
    HppTransferPostPnpDataComponent,
  ],
  imports: [
    CommonModule,
    HppRoutingModule,
    CustomMaterialModule
  ]
})
export class HppModule { }
