import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProductViewComponent } from './insert-product-view.component';

describe('InsertProductViewComponent', () => {
  let component: InsertProductViewComponent;
  let fixture: ComponentFixture<InsertProductViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertProductViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
