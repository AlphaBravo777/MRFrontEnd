import { TestBed } from '@angular/core/testing';

import { InsertOrderApiService } from './insert-order-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('InsertOrderApiService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ApolloTestingModule]
        })
    );

    it('should be created', () => {
        const service: InsertOrderApiService = TestBed.get(
            InsertOrderApiService
        );
        expect(service).toBeTruthy();
    });
});
