import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormSizeComponent } from './product-form-size.component';

describe('ProductFormSizeComponent', () => {
  let component: ProductFormSizeComponent;
  let fixture: ComponentFixture<ProductFormSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
