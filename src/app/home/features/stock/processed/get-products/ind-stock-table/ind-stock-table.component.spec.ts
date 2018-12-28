import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndStockTableComponent } from './ind-stock-table.component';

describe('IndStockTableComponent', () => {
  let component: IndStockTableComponent;
  let fixture: ComponentFixture<IndStockTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndStockTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndStockTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
