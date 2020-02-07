import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormGroupsComponent } from './product-form-groups.component';

describe('ProductFormGroupsComponent', () => {
  let component: ProductFormGroupsComponent;
  let fixture: ComponentFixture<ProductFormGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
