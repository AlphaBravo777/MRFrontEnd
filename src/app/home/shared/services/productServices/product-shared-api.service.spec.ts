import { TestBed } from '@angular/core/testing';

import { ProductSharedApiService } from './product-shared-api.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ProductSharedApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ ApolloTestingModule ],
  }));

  it('should be created', () => {
    const service: ProductSharedApiService = TestBed.get(ProductSharedApiService);
    expect(service).toBeTruthy();
  });
});
