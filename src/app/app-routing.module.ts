import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/login/register.component';
import { AboutComponent } from './home/website/about/about.component';
import { ContactComponent } from './home/website/contact/contact.component';
import { UserNamesComponent } from './home/login/user-names.component';
import { AuthGuard } from './home/login/auth.guard';
import { StockTakingComponent } from './home/features/stock/stock-taking.component';


const appRoutes: Routes = [
  {
    path: 'stock-taking',
    component: StockTakingComponent
  },
  {
    path: 'login',
    component: LoginComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'contact',
    component: UserNamesComponent,
    canActivate: [AuthGuard]
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


