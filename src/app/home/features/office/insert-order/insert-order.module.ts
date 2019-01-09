import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsertOrderRoutingModule } from './insert-order-routing.module';
import { InsertOrderDataComponent } from './insert-order-data/insert-order-data.component';

@NgModule({
    declarations: [
        InsertOrderDataComponent
    ],
    imports: [
        CommonModule,
        InsertOrderRoutingModule
    ]
})
export class InsertOrderModule { }
