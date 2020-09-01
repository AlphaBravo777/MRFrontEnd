import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialConfigModule } from '../../../../material-config/material-config.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';



import { ProcessedRoutingModule } from './processed-routing.module';
import { ProcStockTakeDataComponent } from './stock-take/proc-stock-take-data/proc-stock-take-data.component';
import { CustomMaterialModule } from '../../../shared/dropdown-table/custom-material.module';
import { ProcStockTicketComponent } from './stock-take/proc-stock-ticket/proc-stock-ticket.component';
import { ProcStockView1Component } from './stock-take/proc-stock-view1/proc-stock-view1.component';
import { ProcStockView2Component } from './stock-take/proc-stock-view2/proc-stock-view2.component';
import { ProcStockFilterComponent } from './stock-take/proc-stock-filter/proc-stock-filter.component';
import { PsRankingDataComponent } from './stock-take/proc-stock-ranking/ps-ranking-data/ps-ranking-data.component';
import { PsRankingView1Component } from './stock-take/proc-stock-ranking/ps-ranking-view1/ps-ranking-view1.component';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    ProcessedRoutingModule,
    CustomMaterialModule,
    MaterialConfigModule,
    FormsModule,
    DragDropModule,
    SharedComponentsModule
  ],
  declarations: [
      ProcStockTakeDataComponent,
      ProcStockTicketComponent,
      ProcStockView1Component,
      ProcStockView2Component,
      ProcStockFilterComponent,
      PsRankingDataComponent,
      PsRankingView1Component]
})
export class ProcessedModule { }
