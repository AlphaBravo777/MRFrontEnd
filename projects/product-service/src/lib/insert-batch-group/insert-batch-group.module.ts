import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsertBatchGroupRoutingModule } from './insert-batch-group-routing.module';
import { InsertBatchGroupDataComponent } from './2#insert-batch-group-data/insert-batch-group-data.component';
import { InsertBatchGroupViewComponent } from './3#insert-batch-group-view/insert-batch-group-view.component';


@NgModule({
  declarations: [InsertBatchGroupDataComponent, InsertBatchGroupViewComponent],
  imports: [
    CommonModule,
    InsertBatchGroupRoutingModule
  ]
})
export class InsertBatchGroupModule { }
