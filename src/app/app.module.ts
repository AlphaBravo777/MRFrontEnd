import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { MatDialogModule, MatMenuModule, MatListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptorService } from './home/core/token-interceptor.service';
import { UrlsService } from './home/core/urls.service';
import { AuthService } from './home/features/admin/auth.service';
import { AuthGuard } from './home/features/admin/auth.guard';
import { WebsiteModule } from './home/website/website.module';
import { UserEntryModule } from './home/shared/user-entry.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HomeComponent } from './home/home.component';
import { WebsiteComponent } from './home/website/website.component';
import { WebsiteNavComponent } from './home/website/website-nav/website-nav.component';
import { UnderConstructionComponent } from './home/shared/under-construction/under-construction.component';
import { AlertComponent } from './home/core/alerts/alert.component';
import { AlertService } from './home/core/alerts/alert.service';
import { DialogBoxComponent } from './home/core/dialog-box/dialog-box.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminPageComponent } from './home/features/admin/admin-page/admin-page.component';




@NgModule({
    exports: [
    ],
    imports: [
        // Each module has to import it's own dependencies. You can not inherit it from other modules.
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        WebsiteModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgHttpLoaderModule,
        UserEntryModule,
        NgxPermissionsModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        WebsiteComponent,
        WebsiteNavComponent,
        UnderConstructionComponent,
        AlertComponent,
        DialogBoxComponent,
        AdminPageComponent,
    ],
    providers: [
        AuthGuard,
        AuthService,
        UrlsService,
        AlertService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
    entryComponents: [
        DialogBoxComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
