import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppStockTakeDataComponent } from './hpp-stock-take-data.component';

describe('HppStockTakeDataComponent', () => {
  let component: HppStockTakeDataComponent;
  let fixture: ComponentFixture<HppStockTakeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppStockTakeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppStockTakeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
