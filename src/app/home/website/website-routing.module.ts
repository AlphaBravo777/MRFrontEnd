import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from '../features/admin/login/login.component';
import { AuthGuard } from '../features/admin/auth.guard';
import { WebsiteHomeComponent } from './website-home/website-home.component';
import { WebsiteComponent } from './website.component';

const websiteRoutes: Routes = [
    {
        path: '',
        component: WebsiteComponent,
        children: [
            {
                path: '',
                component: WebsiteHomeComponent,
                // outlet: 'websiteNav'
            },
            {
                path: 'home',
                component: WebsiteHomeComponent,
                // outlet: 'websiteNav'
            },
            {
                path: 'about',
                component: AboutComponent,
                // outlet: 'websiteNav'
            },
            {
                path: 'contact',
                component: ContactComponent,
                // outlet: 'websiteNav'
            },
            {
                path: 'login',
                component: LoginComponent,
                // outlet: 'websiteNav'
            }
    ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(websiteRoutes)],
    exports: [
        RouterModule
    ],
    providers: []
})
export class WebsiteRoutingModule { }

export const WebsiteRoutingComponents = [WebsiteHomeComponent, AboutComponent, ContactComponent, LoginComponent];
