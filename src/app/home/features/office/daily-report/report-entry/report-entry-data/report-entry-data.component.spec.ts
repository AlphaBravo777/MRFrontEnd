import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEntryDataComponent } from './report-entry-data.component';

describe('ReportEntryDataComponent', () => {
  let component: ReportEntryDataComponent;
  let fixture: ComponentFixture<ReportEntryDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEntryDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEntryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
