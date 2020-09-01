import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomKeyboardComponent } from './custom-keyboard.component';

describe('CustomKeyboardComponent', () => {
  let component: CustomKeyboardComponent;
  let fixture: ComponentFixture<CustomKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
