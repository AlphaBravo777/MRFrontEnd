import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumKeyboardComponent } from './num-keyboard.component';

describe('NumKeyboardComponent', () => {
  let component: NumKeyboardComponent;
  let fixture: ComponentFixture<NumKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
