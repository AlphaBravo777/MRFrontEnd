import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRiskItems3Component } from './high-risk-items3.component';

describe('HighRiskItems3Component', () => {
  let component: HighRiskItems3Component;
  let fixture: ComponentFixture<HighRiskItems3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighRiskItems3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighRiskItems3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
