import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewWeeklyOrdersRoutingModule } from './view-weekly-orders-routing.module';
import { ViewWeeklyOrdersDataComponent } from './2#view-weekly-orders-data/view-weekly-orders-data.component';
import { ViewWeeklyOrdersViewComponent } from './3#view-weekly-orders-view/view-weekly-orders-view.component';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';

@NgModule({
  declarations: [ViewWeeklyOrdersDataComponent, ViewWeeklyOrdersViewComponent],
  imports: [
    CommonModule,
    ViewWeeklyOrdersRoutingModule,
    SharedComponentsModule
  ]
})
export class ViewWeeklyOrdersModule { }
