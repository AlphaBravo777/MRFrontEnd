import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormNameComponent } from './product-form-name.component';

describe('ProductFormNameComponent', () => {
  let component: ProductFormNameComponent;
  let fixture: ComponentFixture<ProductFormNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
