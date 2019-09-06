import { NgModule } from '@angular/core';
import {
    InsertOrderServiceRoutingComponent,
    InsertOrderServiceRoutingModule
} from './insert-order-service-routing.module';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { InsertOrderModule } from './insert-order/insert-order.module';

@NgModule({
    declarations: [
        InsertOrderServiceRoutingComponent,
    ],
    imports: [
        InsertOrderModule,
        InsertOrderServiceRoutingModule,
        CommonModule,
        CustomMaterialModule,

    ],
    exports: []
})
export class InsertOrderServiceModule {}
