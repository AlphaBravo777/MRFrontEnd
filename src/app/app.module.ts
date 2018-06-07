import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptorService } from './home/core/token-interceptor.service';
import { StocksModule } from './home/features/stock/stocks.module';
import { UrlsService } from './home/core/urls.service';
import { AuthService } from './home/features/admin/auth.service';
import { AuthGuard } from './home/features/admin/auth.guard';
import { WebsiteModule } from './home/website/website.module';

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
    StocksModule
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
