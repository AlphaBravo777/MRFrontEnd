import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserServiceComponent } from './user-service.component';


const userServiceRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: UserServiceComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
        userServiceRoutes,
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class UserServiceRoutingModule { }
