import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UlpDialyReportRoutingModule } from './ulp-dialy-report-routing.module';
import { SharedComponentsModule } from '../../../components/shared-components.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UlpDialyReportRoutingModule,
    SharedComponentsModule
  ]
})
export class UlpDialyReportModule { }
