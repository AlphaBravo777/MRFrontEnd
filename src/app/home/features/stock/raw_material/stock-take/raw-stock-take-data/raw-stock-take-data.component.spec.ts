import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawStockTakeDataComponent } from './raw-stock-take-data.component';

describe('RawStocTakeDataComponent', () => {
  let component: RawStockTakeDataComponent;
  let fixture: ComponentFixture<RawStockTakeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawStockTakeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawStockTakeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
