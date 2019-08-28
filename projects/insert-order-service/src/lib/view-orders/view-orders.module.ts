import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOrdersRoutingModule } from './view-orders-routing.module';
import { ViewOrderDataComponent } from './2#view-order-data/view-order-data.component';
import { ViewOrderMainViewComponent } from './3#view-order-main-view/view-order-main-view.component';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { ViewSpecificOrderDataComponent } from '../view-specific-order/2#view-specific-order-data/view-specific-order-data.component';

@NgModule({
  declarations: [ViewOrderDataComponent, ViewOrderMainViewComponent, ViewSpecificOrderDataComponent],
  imports: [
    CommonModule,
    ViewOrdersRoutingModule,
    SharedComponentsModule,
    CustomMaterialModule,
  ]
})
export class ViewOrdersModule { }
