import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppTransferButtonsComponent } from './hpp-transfer-buttons.component';

describe('HppTransferButtonsComponent', () => {
  let component: HppTransferButtonsComponent;
  let fixture: ComponentFixture<HppTransferButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppTransferButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppTransferButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
