import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavMenuBarComponent } from './user-nav-menu-bar.component';
import {
    NgxPermissionsStore,
    NgxPermissionsService,
    NgxPermissionsConfigurationService,
    NgxPermissionsConfigurationStore,
    NgxRolesService,
    NgxRolesStore,
    USE_PERMISSIONS_STORE,
    USE_CONFIGURATION_STORE,
    USE_ROLES_STORE,
    NgxPermissionsModule
} from 'ngx-permissions';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserNavMenuBarComponent', () => {
    let component: UserNavMenuBarComponent;
    let fixture: ComponentFixture<UserNavMenuBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserNavMenuBarComponent],
            imports: [ NgxPermissionsModule, HttpClientTestingModule ],
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
        fixture = TestBed.createComponent(UserNavMenuBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
