import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialStockTakeViewComponent } from './raw-material-stock-take-view.component';

describe('RawMaterialStockTakeViewComponent', () => {
  let component: RawMaterialStockTakeViewComponent;
  let fixture: ComponentFixture<RawMaterialStockTakeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawMaterialStockTakeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawMaterialStockTakeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
