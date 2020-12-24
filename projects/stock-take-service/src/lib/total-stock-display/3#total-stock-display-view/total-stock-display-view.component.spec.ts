import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalStockDisplayViewComponent } from './total-stock-display-view.component';

describe('TotalStockDisplayViewComponent', () => {
  let component: TotalStockDisplayViewComponent;
  let fixture: ComponentFixture<TotalStockDisplayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalStockDisplayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalStockDisplayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
