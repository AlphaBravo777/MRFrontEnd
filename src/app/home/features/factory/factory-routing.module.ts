import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../admin/admin-services/auth.guard';
import { FactoryEntryComponent } from './$factory-entry/factory-entry.component';
import { FactoryMenuComponent } from './$factory-menu/factory-menu.component';

const factoryRoutes: Routes = [
    {
        path: '',   // factory
        component: FactoryEntryComponent,
        children: [
            {
                path: 'menu',
                component: FactoryMenuComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'high-risk',
                loadChildren: './high-risk/high-risk.module#HighRiskModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'production-floor',
                loadChildren: './production-floor/production-floor.module#ProductionFloorModule',
                canActivate: [AuthGuard],
            },
            {
                path: 'dispatch',
                loadChildren: './dispatch/dispatch.module#DispatchModule',
                canActivate: [AuthGuard],
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(factoryRoutes)
    ],
    exports: [RouterModule]
})
export class FactoryRoutingModule { }
