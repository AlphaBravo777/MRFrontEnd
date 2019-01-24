import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchLoadTrucksRoutingModule } from './dispatch-load-trucks-routing.module';
import { LoadTrucksDataComponent } from './load-trucks-data/load-trucks-data.component';
import { LoadTrucksView1Component } from './load-trucks-view1/load-trucks-view1.component';
import { LoadTrucksCompareComponent } from './load-trucks-compare/load-trucks-compare.component';
import { LoadTrucksLoadingComponent } from './load-trucks-loading/load-trucks-loading.component';

@NgModule({
  declarations: [LoadTrucksDataComponent, LoadTrucksView1Component, LoadTrucksCompareComponent, LoadTrucksLoadingComponent ],
  imports: [
    CommonModule,
    DispatchLoadTrucksRoutingModule
  ]
})
export class DispatchLoadTrucksModule { }
