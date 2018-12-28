import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../admin/admin-services/auth.guard';

const factoryRoutes: Routes = [
    {
        path: 'user',
        children: [
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
