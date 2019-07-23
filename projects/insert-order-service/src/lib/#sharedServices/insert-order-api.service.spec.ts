import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InsertOrderApiService } from './insert-order-api.service';

describe('InsertOrderApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: InsertOrderApiService = TestBed.get(InsertOrderApiService);
    expect(service).toBeTruthy();
  });
});
