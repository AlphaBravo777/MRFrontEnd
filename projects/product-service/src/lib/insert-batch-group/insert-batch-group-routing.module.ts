import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertBatchGroupDataComponent } from './2#insert-batch-group-data/insert-batch-group-data.component';


const insertBatchRoutes: Routes = [
    {
        path: '',
        component: InsertBatchGroupDataComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(insertBatchRoutes)],
  exports: [RouterModule]
})
export class InsertBatchGroupRoutingModule { }
