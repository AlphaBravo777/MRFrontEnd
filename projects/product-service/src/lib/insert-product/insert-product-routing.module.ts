import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertProductDataComponent } from './2#insert-product-data/insert-product-data.component';


const insertItemsRoutes: Routes = [
    {
        path: '',
        component: InsertProductDataComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(insertItemsRoutes)],
  exports: [RouterModule]
})
export class InsertProductRoutingModule { }
