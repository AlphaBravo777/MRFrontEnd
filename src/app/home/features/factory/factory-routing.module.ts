import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { FactoryComponent } from './factory.component';

const appRoutes: Routes = [];
//     {
//         path: 'roles', component: FactoryComponent
//     },
//     {
//         path: 'permissions', component: FactoryComponent
//
//     },
//     {
//         path: 'no-roles',
//         component: FactoryComponent,
//         canActivate: [NgxPermissionsGuard],
//         data: {
//             permissions: {
//                 only: 'Nice'
//             }
//         }
//     },
//     {
//         path: 'no-permissions',
//         component: FactoryComponent,
//         canActivate: [NgxPermissionsGuard],
//         data: {
//             permissions: {
//                 only: 'Nice'
//             }
//         }
//     },
// ];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class FactoryRoutingModule { }
