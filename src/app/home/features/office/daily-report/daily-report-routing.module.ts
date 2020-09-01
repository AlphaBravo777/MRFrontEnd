import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportReadDataComponent } from './report-read/report-read-data/report-read-data.component';
import { ReportEntryDataComponent } from './report-entry/report-entry-data/report-entry-data.component';
import { AuthGuard } from '../../admin/admin-services/auth.guard';
import { ReportMainComponent } from './$report-main/report-main.component';

const dailyReportRoutes: Routes = [
    {
        path: '', // daily-report
        // component: ReportMainComponent,
        children: [
            {
                path: 'report-main',
                component: ReportMainComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'report-read',
                component: ReportReadDataComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'report-entry',
                component: ReportEntryDataComponent,
                canActivate: [AuthGuard],
            },
            // {
            //     path: 'proc-stock-ranking',
            //     component: PsRankingDataComponent,
            // },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(dailyReportRoutes)],
  exports: [RouterModule]
})
export class DailyReportRoutingModule { }
