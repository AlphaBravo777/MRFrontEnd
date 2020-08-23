import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../admin/admin-services/auth.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RegisterComponent } from './register-user/register.component';
import { AdminExcelTestComponent } from './excel-tests/admin-excel-test.component';

const adminRoutes: Routes = [
    {
        path: '',
        // component: RegisterComponent,
        children: [
            {
                path: 'admin',
                component: AdminPageComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'register-user',
                component: RegisterComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'excel-tests',
                component: AdminExcelTestComponent,
                canActivate: [AuthGuard],
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
