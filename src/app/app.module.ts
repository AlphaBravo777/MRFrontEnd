import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/website/about/about.component';
import { ContactComponent } from './home/website/contact/contact.component';
import { LoginComponent } from './home/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterComponent } from './home/login/register.component';
import { AuthService } from './home/login/auth.service';
import { UserdataService } from './home/login/userdata.service';
import { UserNamesComponent } from './home/login/user-names.component';
import { AuthGuard } from './home/login/auth.guard';
import { TokenInterceptorService } from './home/services/token-interceptor.service';
import { StocksModule } from './home/features/stock/stocks.module';
import { UrlsService } from './home/core/urls.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    UserNamesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StocksModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UrlsService,
    UserdataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
