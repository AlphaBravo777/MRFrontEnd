import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { WebsiteComponent } from './home/website/website.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: WebsiteComponent
  },
  {
    path: 'main',
    loadChildren: './home/shared/main-portal/main-portal.module#MainPortalModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    //   { preloadingStrategy: PreloadAllModules }
    //   { enableTracing: false, // <-- debugging purposes only }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
