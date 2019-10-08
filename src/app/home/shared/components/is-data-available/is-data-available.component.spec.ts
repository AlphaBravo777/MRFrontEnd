import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsDataAvailableComponent } from './is-data-available.component';
import { MainOutsideContainerComponent } from '../main-outside-container/main-outside-container.component';

describe('IsDataAvailableComponent', () => {
  let component: IsDataAvailableComponent;
  let fixture: ComponentFixture<IsDataAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsDataAvailableComponent, MainOutsideContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsDataAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
