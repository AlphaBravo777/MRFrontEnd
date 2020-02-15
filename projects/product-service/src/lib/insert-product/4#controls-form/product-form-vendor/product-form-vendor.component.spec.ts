import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormVendorComponent } from './product-form-vendor.component';

describe('ProductFormVendorComponent', () => {
  let component: ProductFormVendorComponent;
  let fixture: ComponentFixture<ProductFormVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
