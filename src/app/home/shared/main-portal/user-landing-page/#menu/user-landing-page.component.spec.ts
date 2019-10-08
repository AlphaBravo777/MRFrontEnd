import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLandingPageComponent } from './user-landing-page.component';
import { UlpDailyReportComponent } from '../daily-report/ulp-daily-report.component';
import { UlpDailyRoutesComponent } from '../daily-routes/ulp-daily-routes.component';
import { ExpandableDivComponent } from '../../../components/expandable-div/expandable-div.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserLandingPageComponent', () => {
  let component: UserLandingPageComponent;
  let fixture: ComponentFixture<UserLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLandingPageComponent, UlpDailyReportComponent, UlpDailyRoutesComponent, ExpandableDivComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
