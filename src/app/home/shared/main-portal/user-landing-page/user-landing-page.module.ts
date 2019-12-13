import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLandingPageRoutingModule } from './user-landing-page-routing.module';
import { UserLandingPageComponent } from './#menu/user-landing-page.component';
import { UserLandingEntryComponent } from './#entry/user-landing-entry.component';
import { UlpDailyReportComponent } from './daily-report/ulp-daily-report.component';
import { UlpDialyReportModule } from './daily-report/ulp-dialy-report.module';
import { UlpDailyRoutesComponent } from './daily-routes/ulp-daily-routes.component';
import { SharedComponentsModule } from '../../components/shared-components.module';

@NgModule({
    declarations: [
        UserLandingPageComponent,
        UserLandingEntryComponent,
        UlpDailyReportComponent,
        UlpDailyRoutesComponent
    ],
    imports: [
        CommonModule,
        UserLandingPageRoutingModule,
        SharedComponentsModule,
        UlpDialyReportModule
    ]
})
export class UserLandingPageModule {}
