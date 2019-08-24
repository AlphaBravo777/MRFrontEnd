import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountUnitSelectionComponent } from './amount-unit-selection.component';

describe('AmountUnitSelectionComponent', () => {
  let component: AmountUnitSelectionComponent;
  let fixture: ComponentFixture<AmountUnitSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountUnitSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountUnitSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
