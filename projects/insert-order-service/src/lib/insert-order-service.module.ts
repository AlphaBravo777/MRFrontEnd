import { NgModule } from '@angular/core';
import { InsertOrderServiceRoutingComponent, InsertOrderServiceRoutingModule } from './insert-order-service-routing.module';
import { InsertPnpCsvViewComponent } from './insertPnPCSV/3#insert-pnp-csv-view/insert-pnp-csv-view.component';

@NgModule({
  declarations: [ InsertOrderServiceRoutingComponent, InsertPnpCsvViewComponent ],
  imports: [ InsertOrderServiceRoutingModule
  ],
  exports: []
})
export class InsertOrderServiceModule { }
