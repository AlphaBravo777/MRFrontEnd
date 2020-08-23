import { TestBed } from '@angular/core/testing';

import { InsertFormChangesService } from './insert-form-changes.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('InsertFormChangesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ]
  }));

  it('should be created', () => {
    const service: InsertFormChangesService = TestBed.get(InsertFormChangesService);
    expect(service).toBeTruthy();
  });
});
