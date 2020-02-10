import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormPackagingComponent } from './product-form-packaging.component';

describe('ProductFormPackagingComponent', () => {
  let component: ProductFormPackagingComponent;
  let fixture: ComponentFixture<ProductFormPackagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormPackagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
