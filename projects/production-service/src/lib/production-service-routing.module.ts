import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './#entry/entry.component';
import { MenuComponent } from './#menu/menu.component';

const routes: Routes = [
    {
        path: '',
        component: EntryComponent,
    },
    {
        path: 'batchids',
        component: EntryComponent,
        loadChildren: () => import('./create-batch/create-batch.module').then(m => m.CreateBatchModule)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionServiceRoutingModule { }
