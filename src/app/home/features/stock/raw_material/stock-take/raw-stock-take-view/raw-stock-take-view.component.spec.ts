import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawStockTakeViewComponent } from './raw-stock-take-view.component';

describe('RawStockTakeViewComponent', () => {
  let component: RawStockTakeViewComponent;
  let fixture: ComponentFixture<RawStockTakeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawStockTakeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawStockTakeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
