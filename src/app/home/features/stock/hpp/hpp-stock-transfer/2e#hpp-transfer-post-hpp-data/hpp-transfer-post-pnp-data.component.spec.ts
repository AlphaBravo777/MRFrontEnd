import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HppTransferPostPnpDataComponent } from './hpp-transfer-post-pnp-data.component';

describe('HppTransferPostPnpDataComponent', () => {
  let component: HppTransferPostPnpDataComponent;
  let fixture: ComponentFixture<HppTransferPostPnpDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HppTransferPostPnpDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HppTransferPostPnpDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
