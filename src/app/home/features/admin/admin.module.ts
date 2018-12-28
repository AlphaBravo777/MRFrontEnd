import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RegisterComponent } from './register-user/register.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminPageComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
  ],
  exports: [
    AdminPageComponent,
    RegisterComponent,
  ]
})
export class AdminModule { }
