import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndStockContainerComponent } from './ind-stock-container.component';

describe('IndStockContainerComponent', () => {
  let component: IndStockContainerComponent;
  let fixture: ComponentFixture<IndStockContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndStockContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndStockContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
