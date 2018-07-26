import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from '../features/admin/login/login.component';
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
            },
            {
                path: 'home',
                component: WebsiteHomeComponent,
            },
            {
                path: 'about',
                component: AboutComponent,
            },
            {
                path: 'contact',
                component: ContactComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
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
