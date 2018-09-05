import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRiskItemsExtraDataComponent } from './high-risk-items-extra-data.component';

describe('HighRiskItemsExtraDataComponent', () => {
  let component: HighRiskItemsExtraDataComponent;
  let fixture: ComponentFixture<HighRiskItemsExtraDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighRiskItemsExtraDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighRiskItemsExtraDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
