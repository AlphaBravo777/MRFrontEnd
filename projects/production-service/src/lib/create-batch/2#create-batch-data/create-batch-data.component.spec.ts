import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBatchDataComponent } from './create-batch-data.component';

describe('CreateBatchDataComponent', () => {
  let component: CreateBatchDataComponent;
  let fixture: ComponentFixture<CreateBatchDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBatchDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBatchDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
