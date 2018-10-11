import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';

import { UserEntryRoutingModule } from './user-entry-routing.module';
import { StocksModule } from '../features/stock/stocks.module';
import { UserEntryComponent } from './user-entry.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { FactoryModule } from '../features/factory/factory.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RegisterComponent } from '../features/admin/register-user/register.component';
import { CoreMeatriteModule } from '../core/core-meatrite.module';
import { UserNavMenuBarComponent } from './user-nav/user-nav-menu-bar/user-nav-menu-bar.component';



@NgModule({
  imports: [
    CommonModule,
    UserEntryRoutingModule,
    NgxPermissionsModule.forChild(),
    StocksModule,
    FactoryModule,
    SharedModule,
    CoreMeatriteModule,
  ],
  declarations: [
      UserEntryComponent,
      UserNavComponent,
      RegisterComponent,
      UserNavMenuBarComponent,
  ]
})
export class UserEntryModule { }
