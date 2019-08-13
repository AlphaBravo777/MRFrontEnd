import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorChangeInputBoxComponent } from './color-change-input-box.component';

describe('ColorChangeInputBoxComponent', () => {
  let component: ColorChangeInputBoxComponent;
  let fixture: ComponentFixture<ColorChangeInputBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorChangeInputBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorChangeInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
