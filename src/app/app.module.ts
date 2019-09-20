import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptorService } from './home/core/token-interceptor.service';
import { UrlsService } from './home/core/urls.service';
import { AuthService } from './home/features/admin/admin-services/auth.service';
import { AuthGuard } from './home/features/admin/admin-services/auth.guard';
import { WebsiteModule } from './home/website/website.module';
// import { UserEntryModule } from './home/shared/user-entry/user-entry.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HomeComponent } from './home/home.component';
import { WebsiteComponent } from './home/website/website.component';
import { WebsiteNavComponent } from './home/website/website-nav/website-nav.component';
import { AlertComponent } from './home/core/alerts/alert.component';
import { AlertService } from './home/core/alerts/alert.service';
import { DialogBoxComponent } from './home/core/dialog-box/dialog-box.component';
import { CoreMeatriteModule } from './home/core/core-meatrite.module';
import { GraphQLModule } from './graphql.module';
import { MaterialConfigModule } from './material-config/material-config.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormBuilderTypeSafe } from './home/core/reactive-forms/reactive-forms-helper';

@NgModule({
    exports: [
    ],
    imports: [
        // Each module has to import it's own dependencies. You can not inherit it from other modules.
        BrowserModule,
        BrowserAnimationsModule,
        MaterialConfigModule,
        WebsiteModule,
        CoreMeatriteModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgHttpLoaderModule.forRoot(),
        // UserEntryModule,
        NgxPermissionsModule.forRoot(),
        GraphQLModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        WebsiteComponent,
        WebsiteNavComponent,
        AlertComponent,
        DialogBoxComponent,
    ],
    providers: [
        AuthGuard,
        AuthService,
        UrlsService,
        AlertService,
        FormBuilderTypeSafe,
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
export class AppModule {}
