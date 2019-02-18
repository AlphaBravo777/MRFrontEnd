import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPortalComponent } from './main-portal.component';
import { AuthGuard } from '../../features/admin/admin-services/auth.guard';
import { UserNavComponent } from './user-nav/user-nav.component';

const mainPortalRoutes: Routes = [
    {
        path: '',
        component: MainPortalComponent,
        children: [
            {
                path: 'admin',
                loadChildren: '../../features/admin/admin.module#AdminModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'user-nav',
                component: UserNavComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'stock',
                loadChildren: '../../features/stock/stocks.module#StocksModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'stock-raw',
                loadChildren: '../../features/stock/raw_material/raw-material.module#RawMaterialModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'stock-processed',
                loadChildren: '../../features/stock/processed/processed.module#ProcessedModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'admin-office',
                loadChildren: '../../features/office/admin-office.module#AdminOfficeModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'factory',
                loadChildren: '../../features/factory/factory.module#FactoryModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'dispatch',
                loadChildren: '../../features/factory/dispatch/dispatch.module#DispatchModule',
                canActivate: [AuthGuard],
            },
            // {
            //     path: 'checklists',
            //     loadChildren: '../../features/office/checklists/checklists.module#ChecklistsModule',
            //     canActivate: [AuthGuard],
            // },
        ]
    }
];

@NgModule({
  imports: [
      RouterModule.forChild(mainPortalRoutes),
    ],
  exports: [RouterModule]
})
export class MainPortalRoutingModule { }
export const MainPortalRoutingComponent = [ UserNavComponent ];
