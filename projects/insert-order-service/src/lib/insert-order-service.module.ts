import { NgModule } from '@angular/core';
import {
    InsertOrderServiceRoutingComponent,
    InsertOrderServiceRoutingModule
} from './insert-order-service-routing.module';
import { InsertPnpCsvViewComponent } from './insertPnPCSV/3#insert-pnp-csv-view/insert-pnp-csv-view.component';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';

@NgModule({
    declarations: [
        InsertOrderServiceRoutingComponent,
        InsertPnpCsvViewComponent
    ],
    imports: [
        InsertOrderServiceRoutingModule,
        CommonModule,
        CustomMaterialModule
    ],
    exports: []
})
export class InsertOrderServiceModule {}
