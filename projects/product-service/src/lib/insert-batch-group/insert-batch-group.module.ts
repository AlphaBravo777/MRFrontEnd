import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsertBatchGroupRoutingModule } from './insert-batch-group-routing.module';
import { InsertBatchGroupDataComponent } from './2#insert-batch-group-data/insert-batch-group-data.component';
import { InsertBatchGroupViewComponent } from './3#insert-batch-group-view/insert-batch-group-view.component';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { NewBatchGroupFormComponent } from './3#insert-batch-group-view/new-batch-group-form/new-batch-group-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InsertBatchGroupDataComponent, InsertBatchGroupViewComponent, NewBatchGroupFormComponent],
  imports: [
    CommonModule,
    InsertBatchGroupRoutingModule,
    CustomMaterialModule,
    MaterialConfigModule,
    SharedComponentsModule,
    ReactiveFormsModule
  ]
})
export class InsertBatchGroupModule { }
