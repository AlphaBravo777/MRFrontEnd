import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlpDailyReportComponent } from './ulp-daily-report.component';

describe('UlpDailyReportComponent', () => {
  let component: UlpDailyReportComponent;
  let fixture: ComponentFixture<UlpDailyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlpDailyReportComponent ]
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
