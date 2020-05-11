import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertBatchGroupDataComponent } from './insert-batch-group-data.component';

describe('InsertBatchGroupDataComponent', () => {
  let component: InsertBatchGroupDataComponent;
  let fixture: ComponentFixture<InsertBatchGroupDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertBatchGroupDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertBatchGroupDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
