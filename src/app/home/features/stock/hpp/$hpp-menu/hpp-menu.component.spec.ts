import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppMenuComponent } from './hpp-menu.component';

describe('HppMenuComponent', () => {
  let component: HppMenuComponent;
  let fixture: ComponentFixture<HppMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
