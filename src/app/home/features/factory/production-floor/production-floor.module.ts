import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionFloorRoutingModule } from './production-floor-routing.module';
import { ProductionFloorEntryComponent } from './production-floor-entry/production-floor-entry.component';
import { ProductionFloorMenuComponent } from './production-floor-menu/production-floor-menu.component';
// tslint:disable


@NgModule({
    declarations: [
        ProductionFloorEntryComponent,
        ProductionFloorMenuComponent,
    ],
    imports: [
        CommonModule,
        ProductionFloorRoutingModule
    ]
})
export class ProductionFloorModule { }
