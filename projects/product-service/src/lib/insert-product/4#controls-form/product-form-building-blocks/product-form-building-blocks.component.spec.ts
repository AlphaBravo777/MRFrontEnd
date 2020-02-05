import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormBuildingBlocksComponent } from './product-form-building-blocks.component';

describe('ProductFormBuildingBlocksComponent', () => {
  let component: ProductFormBuildingBlocksComponent;
  let fixture: ComponentFixture<ProductFormBuildingBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormBuildingBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormBuildingBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
