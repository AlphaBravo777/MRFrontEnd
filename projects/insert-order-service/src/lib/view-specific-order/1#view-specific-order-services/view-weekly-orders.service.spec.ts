import { TestBed } from '@angular/core/testing';

import { ViewWeeklyOrdersService } from './view-weekly-orders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ViewWeeklyOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ApolloTestingModule ]
  }));

  it('should be created', () => {
    const service: ViewWeeklyOrdersService = TestBed.get(ViewWeeklyOrdersService);
    expect(service).toBeTruthy();
  });
});
