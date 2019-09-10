import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsDataAvailableComponent } from './is-data-available.component';

describe('IsDataAvailableComponent', () => {
  let component: IsDataAvailableComponent;
  let fixture: ComponentFixture<IsDataAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsDataAvailableComponent ]
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
