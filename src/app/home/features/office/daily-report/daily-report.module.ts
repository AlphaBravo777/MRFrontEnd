import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { DailyReportRoutingModule } from './daily-report-routing.module';

import { ReportReadDataComponent } from './report-read/report-read-data/report-read-data.component';
import { ReportEntryDataComponent } from './report-entry/report-entry-data/report-entry-data.component';
import { ReportEntryView1Component } from './report-entry/report-entry-view1/report-entry-view1.component';
import { ReportEntryFormComponent } from './report-entry/report-entry-form/report-entry-form.component';
import { ReportReadView1Component } from './report-read/report-read-view1/report-read-view1.component';
import { ReportMainComponent } from './$report-main/report-main.component';
import { ReportReadMessageComponent } from './report-read/report-read-message/report-read-message.component';

@NgModule({
  declarations: [
    ReportReadDataComponent,
    ReportEntryDataComponent,
    ReportEntryView1Component,
    ReportEntryFormComponent,
    ReportReadView1Component,
    ReportMainComponent,
    ReportReadMessageComponent
  ],
  imports: [
    CommonModule,
    DailyReportRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    CustomMaterialModule
  ]
})
export class DailyReportModule { }
