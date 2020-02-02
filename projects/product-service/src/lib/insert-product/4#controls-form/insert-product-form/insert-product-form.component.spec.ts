import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProductFormComponent } from './insert-product-form.component';

describe('InsertProductFormComponent', () => {
  let component: InsertProductFormComponent;
  let fixture: ComponentFixture<InsertProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
