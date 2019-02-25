import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientOrderRoutingModule } from './client-orders-routing.module';
import { InsertOrderDataComponent } from './2#insert-order-data/insert-order-data.component';
import { InsertOrderView1Component } from './3#insert-order-view1/insert-order-view1.component';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';

@NgModule({
    declarations: [
        InsertOrderDataComponent,
        InsertOrderView1Component
    ],
    imports: [
        CustomMaterialModule,
        CommonModule,
        ClientOrderRoutingModule,
        ReactiveFormsModule,

    ]
})
export class ClientOrderModule { }
