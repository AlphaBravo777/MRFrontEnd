import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';

import { DispatchLoadTrucksRoutingModule } from './dispatch-load-trucks-routing.module';
import { LoadTrucksDataComponent } from './2#load-trucks-data/load-trucks-data.component';
import { LoadTrucksView1Component } from './3#load-trucks-view1/load-trucks-view1.component';
import { LoadTrucksCompareComponent } from './5#load-trucks-compare/load-trucks-compare.component';
import { LoadTrucksLoadingComponent } from './6#load-trucks-loading/load-trucks-loading.component';
import { LoadWidgetComponent } from './7#load-widget/load-widget.component';
import { LoadTrucksView2Component } from './4#load-trucks-view2/load-trucks-view2.component';

@NgModule({
  declarations: [
      LoadTrucksDataComponent,
      LoadTrucksView1Component,
      LoadTrucksCompareComponent,
      LoadTrucksLoadingComponent,
      LoadWidgetComponent,
      LoadTrucksView2Component ],
  imports: [
    CommonModule,
    DispatchLoadTrucksRoutingModule,
    CustomMaterialModule
  ]
})
export class DispatchLoadTrucksModule { }
