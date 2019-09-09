import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UlpDailyReportComponent } from './ulp-daily-report.component';

const ulpDailyRouter: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/home/features/office/admin-office.module').then(m => m.AdminOfficeModule),
    }
];

@NgModule({
  imports: [RouterModule.forChild(ulpDailyRouter)],
  exports: [RouterModule]
})
export class UlpDialyReportRoutingModule { }
