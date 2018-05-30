import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/login/register.component';
import { AboutComponent } from './home/website/about/about.component';
import { ContactComponent } from './home/website/contact/contact.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }


