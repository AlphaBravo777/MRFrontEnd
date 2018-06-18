import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocksComponent } from '../features/stock/stocks.component';
import { UserEntryComponent } from './user-entry.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { FactoryComponent } from '../features/factory/factory.component';

const userEntryRoutes: Routes = [
  {
    path: 'user-nav',
    component: UserNavComponent,
  },
  {
    path: 'user',
    component: UserEntryComponent,
      children: [
        {
          path: 'stocks',
          component: StocksComponent,
          // outlet: 'factoryNav'
        },
        {
          path: 'factory',
          component: FactoryComponent,
          // outlet: 'factoryNav'
        },
        {
          path: 'login',
          component: StocksComponent,
          // outlet: 'websiteNav'
        }
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userEntryRoutes)],
  exports: [RouterModule]
})
export class UserEntryRoutingModule { }
