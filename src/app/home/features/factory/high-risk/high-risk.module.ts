import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighRiskRoutingModule } from './high-risk-routing.module';
import { HighRiskDataComponent } from './high-risk-data/high-risk-data.component';
import { MaterialConfigModule } from '../../../../material-config/material-config.module';
import { HighRiskGroupsComponent } from './high-risk-data/high-risk-groups/high-risk-groups.component';
import { HighRiskItemsComponent } from './high-risk-data/high-risk-groups/high-risk-items/high-risk-items.component';
import { HighRiskGroups2Component } from './high-risk-data/high-risk-groups2/high-risk-groups2.component';
import { HighRiskItems2Component } from './high-risk-data/high-risk-groups2/high-risk-items2/high-risk-items2.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialConfigModule,
    HighRiskRoutingModule
  ],
  declarations: [HighRiskDataComponent, HighRiskGroupsComponent, HighRiskItemsComponent, HighRiskGroups2Component, HighRiskItems2Component]
})
export class HighRiskModule { }
