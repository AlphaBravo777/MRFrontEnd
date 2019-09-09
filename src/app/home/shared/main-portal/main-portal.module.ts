import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MainPortalRoutingModule, MainPortalRoutingComponent } from './main-portal-routing.module';
import { CustomMaterialModule } from '../dropdown-table/custom-material.module';

import { MainPortalComponent } from './main-portal.component';
import { UserNavMenuBarComponent } from './user-nav-menu-bar/user-nav-menu-bar.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { UserEntryComponent } from './user-entry/user-entry.component';
import { DateFormComponent } from './date-picker/date-form/date-form.component';

@NgModule({
  imports: [
    CommonModule,
    MainPortalRoutingModule,
    ReactiveFormsModule,
    MaterialConfigModule,
    NgxPermissionsModule.forChild(),
    CustomMaterialModule,
  ],
  declarations: [
    MainPortalRoutingComponent,
    MainPortalComponent,
    DatePickerComponent,
    UserNavMenuBarComponent,
    UserEntryComponent,
    DateFormComponent,
  ]
})
export class MainPortalModule { }
