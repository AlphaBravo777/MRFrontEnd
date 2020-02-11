import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormSinglesComponent } from './product-form-singles.component';

describe('ProductFormSinglesComponent', () => {
  let component: ProductFormSinglesComponent;
  let fixture: ComponentFixture<ProductFormSinglesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormSinglesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormSinglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
