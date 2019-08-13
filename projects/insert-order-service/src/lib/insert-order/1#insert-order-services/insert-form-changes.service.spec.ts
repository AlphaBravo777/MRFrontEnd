import { TestBed } from '@angular/core/testing';

import { InsertFormChangesService } from './insert-form-changes.service';

describe('InsertFormChangesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertFormChangesService = TestBed.get(InsertFormChangesService);
    expect(service).toBeTruthy();
  });
});
