import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './home/website/about/about.component';
import { ContactComponent } from './home/website/contact/contact.component';
import { StockTakingComponent } from './home/features/stock/stock-taking.component';
import { LoginComponent } from './home/features/admin/login/login.component';
import { AuthGuard } from './home/features/admin/auth.guard';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  // {
  //   // { path: ‘’, pathMatch: ‘full’, redirectTo: ‘first’ },
  //   path: '',
  //   pathMatch: 'full', redirectTo: 'login'
  // },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'factory',
    component: StockTakingComponent,
    canActivate: [AuthGuard]
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


