import { TestBed } from '@angular/core/testing';

import { PnpSharedService } from './pnp-shared.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('PnpSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, ApolloTestingModule ],
  }));

  it('should be created', () => {
    const service: PnpSharedService = TestBed.get(PnpSharedService);
    expect(service).toBeTruthy();
  });
});
