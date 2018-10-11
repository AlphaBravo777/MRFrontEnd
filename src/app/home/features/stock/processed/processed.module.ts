import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessedRoutingModule } from './processed-routing.module';
import { ProcStockTakeDataComponent } from './stock-take/proc-stock-take-data/proc-stock-take-data.component';
import { CustomMaterialModule } from '../../../shared/dropdown-table/custom-material.module';
import { ProcStockTicketComponent } from './stock-take/proc-stock-ticket/proc-stock-ticket.component';

@NgModule({
  imports: [
    CommonModule,
    ProcessedRoutingModule,
    CustomMaterialModule,
  ],
  declarations: [ProcStockTakeDataComponent, ProcStockTicketComponent]
})
export class ProcessedModule { }
