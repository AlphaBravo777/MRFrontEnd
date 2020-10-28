import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { EntryComponent } from './#entry/entry.component';
import { MenuComponent } from './#menu/menu.component';
import { ProductionServiceRoutingModule } from './production-service-routing.module';



@NgModule({
  declarations: [ EntryComponent, MenuComponent],
  imports: [
      ProductionServiceRoutingModule,
      CustomMaterialModule
  ],
  exports: []
})
export class ProductionServiceModule { }
