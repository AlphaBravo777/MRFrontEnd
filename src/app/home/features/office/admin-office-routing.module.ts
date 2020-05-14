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
                loadChildren: () => import('./add-client/add-client.module').then(m => m.AddClientModule),
            },
            {
                path: 'orders',
                loadChildren: () => import('./insert-order/client-orders.module').then(m => m.ClientOrderModule),
            },
            {
                path: 'daily-report',
                loadChildren: () => import('./daily-report/daily-report.module').then(m => m.DailyReportModule),
            },
            {
                path: 'checklists',
                loadChildren: () => import('./checklists/checklists.module').then(m => m.ChecklistsModule),
            },
            {
                path: 'checklists',
                loadChildren: () => import('./checklists/checklists.module').then(m => m.ChecklistsModule),
            },
            {
                path: 'insertOrderService',
                loadChildren: () => import('projects/insert-order-service/src/public_api').then(m => m.InsertOrderServiceModule)
            },
            {
                path: 'productService',
                loadChildren: () => import('projects/product-service/src/public-api').then(m => m.ProductServiceModule)
            },
            {
                path: 'accountService',
                loadChildren: () => import('projects/accounts-service/src/public-api').then(m => m.AccountsServiceModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(officeRoutes)],
  exports: [RouterModule]
})

export class AdminOfficeRoutingModule { }
