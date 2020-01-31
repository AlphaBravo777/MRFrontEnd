import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProductDataComponent } from './insert-product-data.component';

describe('InsertProductDataComponent', () => {
  let component: InsertProductDataComponent;
  let fixture: ComponentFixture<InsertProductDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertProductDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
