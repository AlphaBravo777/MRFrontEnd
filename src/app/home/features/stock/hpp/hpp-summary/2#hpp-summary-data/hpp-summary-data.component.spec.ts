import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppSummaryDataComponent } from './hpp-summary-data.component';

describe('HppSummaryDataComponent', () => {
  let component: HppSummaryDataComponent;
  let fixture: ComponentFixture<HppSummaryDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppSummaryDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppSummaryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
