import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLandingPageComponent } from './#menu/user-landing-page.component';
import { UserLandingEntryComponent } from './#entry/user-landing-entry.component';

const userLandingRoutes: Routes = [
    {
        path: '',
        redirectTo: 'entry/menu',
        pathMatch: 'full'
    },
    {
        path: 'entry',
        component: UserLandingEntryComponent,
        children: [
            {
                path: 'menu',
                component: UserLandingPageComponent,
                children: [
                    {
                        path: 'daily',
                        loadChildren: () => import('./daily-report/ulp-dialy-report.module').then(m => m.UlpDialyReportModule),
                        outlet: 'daily'
                    },
                    {
                        path: 'routes',
                        loadChildren: () => import('./daily-report/ulp-dialy-report.module').then(m => m.UlpDialyReportModule),
                        outlet: 'routes'
                    }
                ]
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(userLandingRoutes)],
  exports: [RouterModule]
})
export class UserLandingPageRoutingModule { }
