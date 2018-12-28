import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRiskDataComponent } from './high-risk-data.component';

describe('HighRiskDataComponent', () => {
  let component: HighRiskDataComponent;
  let fixture: ComponentFixture<HighRiskDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighRiskDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighRiskDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
