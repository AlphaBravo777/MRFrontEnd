import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertBatchGroupViewComponent } from './insert-batch-group-view.component';

describe('InsertBatchGroupViewComponent', () => {
  let component: InsertBatchGroupViewComponent;
  let fixture: ComponentFixture<InsertBatchGroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertBatchGroupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertBatchGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
