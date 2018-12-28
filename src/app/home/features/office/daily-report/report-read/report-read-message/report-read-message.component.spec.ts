import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReadMessageComponent } from './report-read-message.component';

describe('ReportReadMessageComponent', () => {
  let component: ReportReadMessageComponent;
  let fixture: ComponentFixture<ReportReadMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportReadMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReadMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
