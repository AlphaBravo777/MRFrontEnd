import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOrdersRoutingModule } from './view-orders-routing.module';
import { ViewOrderDataComponent } from './2#view-order-data/view-order-data.component';
import { ViewOrderMainViewComponent } from './3#view-order-main-view/view-order-main-view.component';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { ViewSpecificOrderDataComponent } from '../view-specific-order/2#view-specific-order-data/view-specific-order-data.component';
import { ViewSpecificOrderViewComponent } from '../view-specific-order/3#view-specific-order-view/view-specific-order-view.component';
import { HeadingDropdownViewComponent
    } from '../view-specific-order/3#view-specific-order-view/heading-dropdown-view/heading-dropdown-view.component';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';

@NgModule({
    declarations: [
        ViewOrderDataComponent,
        ViewOrderMainViewComponent,
        ViewSpecificOrderDataComponent,
        ViewSpecificOrderViewComponent,
        HeadingDropdownViewComponent
    ],
    imports: [
        CommonModule,
        ViewOrdersRoutingModule,
        SharedComponentsModule,
        CustomMaterialModule,
        MaterialConfigModule
    ]
})
export class ViewOrdersModule {}
