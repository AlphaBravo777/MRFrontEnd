import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialDataComponent } from './raw-material-data.component';

describe('RawMaterialDataComponent', () => {
  let component: RawMaterialDataComponent;
  let fixture: ComponentFixture<RawMaterialDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawMaterialDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawMaterialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
