import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBatchDataComponent } from './2#create-batch-data/create-batch-data.component';


const routes: Routes = [
    {
        path: '',
        component: CreateBatchDataComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBatchRoutingModule { }
