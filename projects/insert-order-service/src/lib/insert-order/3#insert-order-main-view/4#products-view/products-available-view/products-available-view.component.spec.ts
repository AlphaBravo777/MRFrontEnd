import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAvailableViewComponent } from './products-available-view.component';

describe('ProductsAvailableViewComponent', () => {
  let component: ProductsAvailableViewComponent;
  let fixture: ComponentFixture<ProductsAvailableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsAvailableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAvailableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
