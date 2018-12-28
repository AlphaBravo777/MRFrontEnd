import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionFloorEntryComponent } from './production-floor-entry.component';

describe('ProductionFloorEntryComponent', () => {
  let component: ProductionFloorEntryComponent;
  let fixture: ComponentFixture<ProductionFloorEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionFloorEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionFloorEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
