import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialStockTakeDataComponent } from './raw-material-stock-take-data.component';

describe('RawMaterialStockTakeDataComponent', () => {
  let component: RawMaterialStockTakeDataComponent;
  let fixture: ComponentFixture<RawMaterialStockTakeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawMaterialStockTakeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawMaterialStockTakeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
