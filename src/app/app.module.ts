import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptorService } from './home/core/token-interceptor.service';
import { UrlsService } from './home/core/urls.service';
import { AuthService } from './home/features/admin/auth.service';
import { AuthGuard } from './home/features/admin/auth.guard';
import { WebsiteModule } from './home/website/website.module';
import { UserEntryModule } from './home/shared/user-entry.module';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    WebsiteModule,
    HttpClientModule,
    UserEntryModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthService,
    UrlsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
