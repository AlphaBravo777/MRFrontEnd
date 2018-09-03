import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPermissionsModule } from 'ngx-permissions';
import { FactoryRoutingModule } from './factory-routing.module';
import { FactoryComponent } from './factory.component';

@NgModule({
  imports: [
    CommonModule,
    FactoryRoutingModule,
    NgxPermissionsModule.forChild(),
  ],
  declarations: [FactoryComponent]
})
export class FactoryModule { }
