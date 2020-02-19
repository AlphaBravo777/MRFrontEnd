import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallStockTakeComponent } from './small-stock-take.component';

describe('SmallStockTakeComponent', () => {
  let component: SmallStockTakeComponent;
  let fixture: ComponentFixture<SmallStockTakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallStockTakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallStockTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
