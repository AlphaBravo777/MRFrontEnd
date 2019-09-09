import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeEntryComponent } from './$office-entry/office-entry.component';
import { AdminOfficeMenuComponent } from './$office-menu/admin-office-menu.component';

const officeRoutes: Routes = [
    {
        path: '',  // admin-office
        component: OfficeEntryComponent,
        children: [
            {
                path: 'menu',
                component: AdminOfficeMenuComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'clients',
                loadChildren: './add-client/add-client.module#AddClientModule',
            },
            {
                path: 'orders',
                loadChildren: './insert-order/client-orders.module#ClientOrderModule',
            },
            {
                path: 'daily-report',
                loadChildren: './daily-report/daily-report.module#DailyReportModule',
            },
            {
                path: 'checklists',
                loadChildren: './checklists/checklists.module#ChecklistsModule',
            },
            {
                path: 'checklists',
                loadChildren: './checklists/checklists.module#ChecklistsModule',
            },
            {
                path: 'insertOrderService',
                loadChildren: () => import('projects/insert-order-service/src/public_api').then(m => m.InsertOrderServiceModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(officeRoutes)],
  exports: [RouterModule]
})

export class AdminOfficeRoutingModule { }
