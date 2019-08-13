import { TestBed } from '@angular/core/testing';

import { InsertOrderData$Service } from './insert-order-data$.service';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('InsertOrderData$Service', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ],
  }));

  it('should be created', () => {
    const service: InsertOrderData$Service = TestBed.get(InsertOrderData$Service);
    expect(service).toBeTruthy();
  });
});
