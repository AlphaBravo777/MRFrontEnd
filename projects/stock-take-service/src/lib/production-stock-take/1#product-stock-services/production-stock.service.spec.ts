import { TestBed } from '@angular/core/testing';

import { ProductionStockService } from './production-stock.service';

describe('ProductionStockService', () => {
    let service: ProductionStockService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductionStockService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
