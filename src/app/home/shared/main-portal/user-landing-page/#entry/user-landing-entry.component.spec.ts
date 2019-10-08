import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLandingEntryComponent } from './user-landing-entry.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UlpDailyReportComponent } from '../daily-report/ulp-daily-report.component';
import { ExpandableDivComponent } from '../../../components/expandable-div/expandable-div.component';

describe('UserLandingEntryComponent', () => {
  let component: UserLandingEntryComponent;
  let fixture: ComponentFixture<UserLandingEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLandingEntryComponent, UlpDailyReportComponent, ExpandableDivComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLandingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
