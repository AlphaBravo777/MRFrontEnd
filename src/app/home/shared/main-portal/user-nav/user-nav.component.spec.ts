import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavComponent } from './user-nav.component';
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

describe('UserNavComponent', () => {
  let component: UserNavComponent;
  let fixture: ComponentFixture<UserNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNavComponent ],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
