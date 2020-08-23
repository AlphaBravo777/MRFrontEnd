import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RegisterComponent } from './register-user/register.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminExcelTestComponent } from './excel-tests/admin-excel-test.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    RegisterComponent,
    AdminExcelTestComponent,
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
