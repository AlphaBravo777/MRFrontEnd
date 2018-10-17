import { TestBed, inject } from '@angular/core/testing';
import { SingleApiService } from './single-api.service';

describe('SingleApiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingleApiService]
    });
  });

  it('should be created', inject([SingleApiService], (service: SingleApiService) => {
    expect(service).toBeTruthy();
  }));
});
