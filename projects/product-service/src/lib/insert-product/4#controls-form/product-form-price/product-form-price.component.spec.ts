import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormPriceComponent } from './product-form-price.component';

describe('ProductFormPriceComponent', () => {
  let component: ProductFormPriceComponent;
  let fixture: ComponentFixture<ProductFormPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
