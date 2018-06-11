import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './home/website/about/about.component';
import { ContactComponent } from './home/website/contact/contact.component';
import { StocksComponent } from './home/features/stock/stocks.component';
import { LoginComponent } from './home/features/admin/login/login.component';
import { AuthGuard } from './home/features/admin/auth.guard';
import { HomeComponent } from './home/home.component';
import { UserEntryComponent } from './home/shared/user-entry.component';
import { UserNavComponent } from './home/shared/user-nav/user-nav.component';


const appRoutes: Routes = [
  // {
  //   // { path: ‘’, pathMatch: ‘full’, redirectTo: ‘first’ },
  //   path: '',
  //   pathMatch: 'full', redirectTo: 'login'
  // },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'user-nav',
    component: UserNavComponent,
    // canActivate: [AuthGuard]
  },
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


