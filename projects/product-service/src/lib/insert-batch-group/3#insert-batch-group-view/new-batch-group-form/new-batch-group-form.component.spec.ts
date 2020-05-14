import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBatchGroupFormComponent } from './new-batch-group-form.component';

describe('NewBatchGroupFormComponent', () => {
  let component: NewBatchGroupFormComponent;
  let fixture: ComponentFixture<NewBatchGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBatchGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBatchGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
