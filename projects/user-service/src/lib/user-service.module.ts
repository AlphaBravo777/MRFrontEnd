import { NgModule } from '@angular/core';
import { UserServiceComponent } from './user-service.component';
import { UserServiceRoutingModule } from './user-service-routing.module';


@NgModule({
  declarations: [UserServiceComponent],
  imports: [ UserServiceRoutingModule
  ],
  exports: [UserServiceComponent]
})
export class UserServiceModule { }
