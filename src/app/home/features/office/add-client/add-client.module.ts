import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { DynamicFormModule } from 'src/app/home/shared/dynamic-form/dynamic-form.module';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { AddClientRoutingModule } from './add-client-routing.module';

import { AddClientDataComponent } from './add-client-data/add-client-data.component';
import { AddClientView1Component } from './add-client-view1/add-client-view1.component';
import { AddClientFormComponent } from './add-client-form/add-client-form.component';

@NgModule({
  declarations: [
    AddClientDataComponent,
    AddClientView1Component,
    AddClientFormComponent,
  ],
  imports: [
    CustomMaterialModule,
    CommonModule,
    AddClientRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    DynamicFormModule
  ]
})
export class AddClientModule { }
