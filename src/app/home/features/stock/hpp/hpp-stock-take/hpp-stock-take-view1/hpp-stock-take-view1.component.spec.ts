import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppStockTakeView1Component } from './hpp-stock-take-view1.component';

describe('HppStockTakeView1Component', () => {
  let component: HppStockTakeView1Component;
  let fixture: ComponentFixture<HppStockTakeView1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppStockTakeView1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppStockTakeView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
