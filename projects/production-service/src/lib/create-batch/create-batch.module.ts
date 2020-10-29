import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBatchRoutingModule } from './create-batch-routing.module';
import { CreateBatchDataComponent } from './2#create-batch-data/create-batch-data.component';
import { CreateBatchViewComponent } from './3#create-batch-view/create-batch-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';


@NgModule({
  declarations: [CreateBatchDataComponent, CreateBatchViewComponent],
  imports: [
    CommonModule,
    CreateBatchRoutingModule,
    ReactiveFormsModule,
    MaterialConfigModule,
  ],
  exports: [CreateBatchDataComponent]
})
export class CreateBatchModule { }
