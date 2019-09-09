import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOutsideContainerComponent } from './main-outside-container.component';

describe('MainOutsideContainerComponent', () => {
  let component: MainOutsideContainerComponent;
  let fixture: ComponentFixture<MainOutsideContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainOutsideContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainOutsideContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
