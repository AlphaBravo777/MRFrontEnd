import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRiskPackinglistViewComponent } from './high-risk-packinglist-view.component';

describe('HighRiskPackinglistViewComponent', () => {
  let component: HighRiskPackinglistViewComponent;
  let fixture: ComponentFixture<HighRiskPackinglistViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighRiskPackinglistViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighRiskPackinglistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
