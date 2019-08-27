import { TestBed } from '@angular/core/testing';

import { OrderService } from '../../#sharedServices/order.service';
import { TopMenuViewComponent } from '../3#insert-order-main-view/1#top-menu-view/top-menu-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('InsertOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ApolloTestingModule],
      declarations: [ TopMenuViewComponent ]
  }));

  it('should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });
});
