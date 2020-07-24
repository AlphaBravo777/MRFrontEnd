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
                path: 'dispatch',
                loadChildren: () => import('./dispatch/dispatch.module').then(m => m.DispatchModule),
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
