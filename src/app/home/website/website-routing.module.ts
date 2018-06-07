import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from '../features/admin/login/login.component';
import { AuthGuard } from '../features/admin/auth.guard';

const websiteRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
        children: [
            {
              path: 'about',
              component: AboutComponent,
              outlet: 'websiteNav'
            },
            {
              path: 'contact',
              component: ContactComponent,
              outlet: 'websiteNav'
            },
            {
              path: 'login',
              component: LoginComponent,
              outlet: 'websiteNav'
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

export const WebsiteRoutingComponents = [HomeComponent, AboutComponent, ContactComponent, LoginComponent];
