import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighRiskRoutingModule } from './high-risk-routing.module';
import { HighRiskDataComponent } from './high-risk-data/high-risk-data.component';
import { MaterialConfigModule } from '../../../../material-config/material-config.module';
import { CoreMeatriteModule } from '../../../core/core-meatrite.module';
import { HighRiskGroupsComponent } from './high-risk-data/high-risk-groups/high-risk-groups.component';
import { HighRiskItemsComponent } from './high-risk-data/high-risk-groups/high-risk-items/high-risk-items.component';
import { HighRiskGroups2Component } from './high-risk-data/high-risk-groups2/high-risk-groups2.component';
import { HighRiskItems2Component } from './high-risk-data/high-risk-groups2/high-risk-items2/high-risk-items2.component';
import { HighRiskItemsExtraDataComponent } from './high-risk-data/high-risk-groups/high-risk-items/high-risk-items-extra-data/high-risk-items-extra-data.component';
import { OrderByPipe } from '../../../core/services/order-by.pipe';
import { HighRiskItems1Component } from './high-risk-data/high-risk-groups2/high-risk-items1/high-risk-items1.component';
import { HighRiskItems3Component } from './high-risk-data/high-risk-groups2/high-risk-items3/high-risk-items3.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialConfigModule,
    HighRiskRoutingModule,
    CoreMeatriteModule,
  ],
  declarations: [
      HighRiskDataComponent,
      HighRiskGroupsComponent,
      HighRiskItemsComponent,
      HighRiskGroups2Component,
      HighRiskItems2Component,
      HighRiskItemsExtraDataComponent,
      OrderByPipe,
      HighRiskItems1Component,
      HighRiskItems3Component,
    ]
})
export class HighRiskModule { }
