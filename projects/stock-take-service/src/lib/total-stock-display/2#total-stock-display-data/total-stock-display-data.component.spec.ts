import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalStockDisplayDataComponent } from './total-stock-display-data.component';

describe('TotalStockDisplayDataComponent', () => {
  let component: TotalStockDisplayDataComponent;
  let fixture: ComponentFixture<TotalStockDisplayDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalStockDisplayDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalStockDisplayDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
