import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertBatchGroupDataComponent } from './2#insert-batch-group-data/insert-batch-group-data.component';
import { NewBatchGroupFormComponent } from './3#insert-batch-group-view/new-batch-group-form/new-batch-group-form.component';


const insertBatchRoutes: Routes = [
    {
        path: '',
        component: InsertBatchGroupDataComponent,
    },
    {
        path: 'new-batch',
        component: NewBatchGroupFormComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(insertBatchRoutes)],
  exports: [RouterModule]
})
export class InsertBatchGroupRoutingModule { }
