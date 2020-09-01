import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalisticButtonComponent } from './minimalistic-button.component';

describe('MinimalisticButtonComponent', () => {
  let component: MinimalisticButtonComponent;
  let fixture: ComponentFixture<MinimalisticButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimalisticButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimalisticButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
