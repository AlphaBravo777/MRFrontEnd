import { TestBed } from '@angular/core/testing';

import { InsertFormService } from './insert-form.service';

describe('InsertFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertFormService = TestBed.get(InsertFormService);
    expect(service).toBeTruthy();
  });
});
