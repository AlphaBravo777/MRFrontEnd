import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppStockTransferView1Component } from './hpp-stock-transfer-view1.component';

describe('HppStockTransferView1Component', () => {
  let component: HppStockTransferView1Component;
  let fixture: ComponentFixture<HppStockTransferView1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppStockTransferView1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppStockTransferView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
