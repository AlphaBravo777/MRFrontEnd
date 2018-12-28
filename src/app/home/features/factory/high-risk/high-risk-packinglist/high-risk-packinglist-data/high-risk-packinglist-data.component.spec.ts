import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRiskPackinglistDataComponent } from './high-risk-packinglist-data.component';

describe('HighRiskPackinglistDataComponent', () => {
  let component: HighRiskPackinglistDataComponent;
  let fixture: ComponentFixture<HighRiskPackinglistDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighRiskPackinglistDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighRiskPackinglistDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
