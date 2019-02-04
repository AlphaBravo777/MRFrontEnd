import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPermissionsModule } from 'ngx-permissions';
import { FactoryRoutingModule } from './factory-routing.module';
import { FactoryComponent } from './factory.component';
import { FactoryEntryComponent } from './$factory-entry/factory-entry.component';
import { FactoryMenuComponent } from './$factory-menu/factory-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FactoryRoutingModule,
    NgxPermissionsModule.forChild(),
  ],
  declarations: [FactoryComponent, FactoryEntryComponent, FactoryMenuComponent]
})
export class FactoryModule { }
