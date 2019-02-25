import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppTransferPostLeakerDataComponent } from './hpp-transfer-post-leaker-data.component';

describe('HppTransferPostLeakerDataComponent', () => {
  let component: HppTransferPostLeakerDataComponent;
  let fixture: ComponentFixture<HppTransferPostLeakerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppTransferPostLeakerDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppTransferPostLeakerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
