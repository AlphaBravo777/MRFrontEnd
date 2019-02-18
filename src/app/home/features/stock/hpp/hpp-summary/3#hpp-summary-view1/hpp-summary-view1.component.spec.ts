import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppSummaryView1Component } from './hpp-summary-view1.component';

describe('HppSummaryView1Component', () => {
  let component: HppSummaryView1Component;
  let fixture: ComponentFixture<HppSummaryView1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppSummaryView1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppSummaryView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
