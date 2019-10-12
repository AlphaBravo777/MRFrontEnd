import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlpDailyReportComponent } from './ulp-daily-report.component';
import { ExpandableDivComponent } from '../../../components/expandable-div/expandable-div.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UlpDailyReportComponent', () => {
  let component: UlpDailyReportComponent;
  let fixture: ComponentFixture<UlpDailyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlpDailyReportComponent, ExpandableDivComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlpDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
