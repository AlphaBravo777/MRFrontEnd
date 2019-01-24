import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchMenuComponent } from './dispatch-menu.component';

describe('DispatchMenuComponent', () => {
  let component: DispatchMenuComponent;
  let fixture: ComponentFixture<DispatchMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
