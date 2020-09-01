import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatLabelInputBoxComponent } from './float-label-input-box.component';
import { ReactiveFormsModule, FormBuilder, FormGroupDirective } from '@angular/forms';

const formBuilder: FormBuilder = new FormBuilder();

describe('FloatLabelInputBoxComponent', () => {
  let component: FloatLabelInputBoxComponent;
  let fixture: ComponentFixture<FloatLabelInputBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatLabelInputBoxComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ FormGroupDirective, { provide: FormBuilder, useValue: formBuilder }  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatLabelInputBoxComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
