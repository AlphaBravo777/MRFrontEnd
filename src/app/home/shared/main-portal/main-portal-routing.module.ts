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
                path: 'landing-page',
                loadChildren: () => import('./user-landing-page/user-landing-page.module').then(m => m.UserLandingPageModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'admin',
                loadChildren: () => import('../../features/admin/admin.module').then(m => m.AdminModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'user-nav',
                component: UserNavComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'stock',
                loadChildren: () => import('../../features/stock/stocks.module').then(m => m.StocksModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'stock-processed',
                loadChildren: () => import('../../features/stock/processed/processed.module').then(m => m.ProcessedModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'admin-office',
                loadChildren: () => import('../../features/office/admin-office.module').then(m => m.AdminOfficeModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'factory',
                loadChildren: () => import('../../features/factory/factory.module').then(m => m.FactoryModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'dispatch',
                loadChildren: () => import('../../features/factory/dispatch/dispatch.module').then(m => m.DispatchModule),
                canActivate: [AuthGuard],
            },
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
