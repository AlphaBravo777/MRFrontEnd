import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPortalComponent } from './main-portal.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { UserNavMenuBarComponent } from './user-nav-menu-bar/user-nav-menu-bar.component';
import { UserEntryComponent } from './user-entry/user-entry.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput
} from '@angular/material';
import {
    ApolloTestingModule,
    ApolloTestingController
} from 'apollo-angular/testing';
import { DateFormComponent } from './date-picker/date-form/date-form.component';
import {
    NgxPermissionsModule,
    NgxPermissionsService,
    NgxPermissionsDirective,
    USE_PERMISSIONS_STORE,
    NgxPermissionsStore,
    NgxPermissionsConfigurationService,
    USE_CONFIGURATION_STORE,
    NgxPermissionsConfigurationStore,
    NgxRolesService,
    USE_ROLES_STORE,
    NgxRolesStore
} from 'ngx-permissions';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomMaterialModule } from '../dropdown-table/custom-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MainPortalComponent', () => {
    let component: MainPortalComponent;
    let fixture: ComponentFixture<MainPortalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                NgxPermissionsModule,
                RouterTestingModule,
                CustomMaterialModule,
                HttpClientTestingModule,
                ApolloTestingModule
            ],
            declarations: [
                MainPortalComponent,
                DatePickerComponent,
                UserNavMenuBarComponent,
                UserEntryComponent,
                MatDatepicker,
                MatDatepickerToggle,
                DateFormComponent,
                MatDatepickerInput
            ],
            providers: [
                NgxPermissionsStore,
                NgxPermissionsService,
                NgxPermissionsConfigurationService,
                NgxPermissionsConfigurationStore,
                NgxRolesService,
                NgxRolesStore,
                { provide: USE_PERMISSIONS_STORE, useValue: {} },
                { provide: USE_CONFIGURATION_STORE, useValue: {} },
                { provide: USE_ROLES_STORE, useValue: {} }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainPortalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
