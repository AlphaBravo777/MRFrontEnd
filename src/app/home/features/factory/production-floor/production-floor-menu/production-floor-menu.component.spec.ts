import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionFloorMenuComponent } from './production-floor-menu.component';

describe('ProductionFloorMenuComponent', () => {
  let component: ProductionFloorMenuComponent;
  let fixture: ComponentFixture<ProductionFloorMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionFloorMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionFloorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
