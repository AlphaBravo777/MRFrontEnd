import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserEntryRoutingModule } from './user-entry-routing.module';
import { StocksModule } from '../features/stock/stocks.module';
import { UserEntryComponent } from './user-entry.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { FactoryModule } from '../features/factory/factory.module';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    UserEntryRoutingModule,
    NgxPermissionsModule.forChild(),
    StocksModule,
    FactoryModule
  ],
  declarations: [
      UserEntryComponent,
      UserNavComponent,
  ]
})
export class UserEntryModule { }
