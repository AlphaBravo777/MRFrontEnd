import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RainbowProgressBarComponent } from './rainbow-progress-bar.component';

describe('RainbowProgressBarComponent', () => {
  let component: RainbowProgressBarComponent;
  let fixture: ComponentFixture<RainbowProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RainbowProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RainbowProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
