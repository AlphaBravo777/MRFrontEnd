import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';

import { DispatchLoadTrucksRoutingModule } from './dispatch-load-trucks-routing.module';
import { LoadTrucksDataComponent } from './load-trucks-data/load-trucks-data.component';
import { LoadTrucksView1Component } from './load-trucks-view1/load-trucks-view1.component';
import { LoadTrucksCompareComponent } from './load-trucks-compare/load-trucks-compare.component';
import { LoadTrucksLoadingComponent } from './load-trucks-loading/load-trucks-loading.component';
import { LoadWidgetComponent } from './load-widget/load-widget.component';

@NgModule({
  declarations: [
      LoadTrucksDataComponent,
      LoadTrucksView1Component,
      LoadTrucksCompareComponent,
      LoadTrucksLoadingComponent,
      LoadWidgetComponent ],
  imports: [
    CommonModule,
    DispatchLoadTrucksRoutingModule,
    CustomMaterialModule
  ]
})
export class DispatchLoadTrucksModule { }
