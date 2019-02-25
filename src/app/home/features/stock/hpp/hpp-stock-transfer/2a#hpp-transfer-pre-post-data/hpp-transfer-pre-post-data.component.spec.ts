import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppTransferPrePostDataComponent } from './hpp-transfer-pre-post-data.component';

describe('HppTransferPrePostDataComponent', () => {
  let component: HppTransferPrePostDataComponent;
  let fixture: ComponentFixture<HppTransferPrePostDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppTransferPrePostDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppTransferPrePostDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
