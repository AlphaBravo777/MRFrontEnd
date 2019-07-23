import { TestBed } from '@angular/core/testing';

import { InsertOrderService } from './insert-order.service';
import { TopMenuViewComponent } from '../insert-order/3#insert-order-main-view/1#top-menu-view/top-menu-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('InsertOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ApolloTestingModule],
      declarations: [ TopMenuViewComponent ]
  }));

  it('should be created', () => {
    const service: InsertOrderService = TestBed.get(InsertOrderService);
    expect(service).toBeTruthy();
  });
});
