import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppPalletsDataComponent } from './hpp-pallets-data.component';

describe('HppPalletsDataComponent', () => {
  let component: HppPalletsDataComponent;
  let fixture: ComponentFixture<HppPalletsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppPalletsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppPalletsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
