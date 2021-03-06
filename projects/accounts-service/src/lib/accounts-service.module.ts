import { NgModule } from '@angular/core';
import { EntryComponent } from './#entry/entry.component';
import { MenuComponent } from './#menu/menu.component';
import { CommonModule } from '@angular/common';
import { AccountsServiceRoutingModule } from './accounts-service-routing.module';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { AddAccountDataComponent } from './add-account/2#add-account-data/add-account-data.component';
import { AddAccountMainViewComponent } from './add-account/3#add-account-main-view/add-account-main-view.component';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EntryComponent, MenuComponent, AddAccountDataComponent, AddAccountMainViewComponent],
  imports: [
      CommonModule,
      AccountsServiceRoutingModule,
      CustomMaterialModule,
      SharedComponentsModule,
      MaterialConfigModule,
      ReactiveFormsModule
  ],
  exports: []
})
export class AccountsServiceModule { }
