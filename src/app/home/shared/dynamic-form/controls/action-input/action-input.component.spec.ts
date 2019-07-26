import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionInputComponent } from './action-input.component';

describe('ActionInputComponent', () => {
  let component: ActionInputComponent;
  let fixture: ComponentFixture<ActionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
