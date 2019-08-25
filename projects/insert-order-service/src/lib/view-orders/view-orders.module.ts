import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOrdersRoutingModule } from './view-orders-routing.module';
import { ViewOrderDataComponent } from './2#view-order-data/view-order-data.component';
import { ViewOrderMainViewComponent } from './3#view-order-main-view/view-order-main-view.component';

@NgModule({
  declarations: [ViewOrderDataComponent, ViewOrderMainViewComponent],
  imports: [
    CommonModule,
    ViewOrdersRoutingModule
  ]
})
export class ViewOrdersModule { }
