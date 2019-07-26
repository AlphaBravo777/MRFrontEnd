import { TestBed } from '@angular/core/testing';

import { RoutesSharedApiService } from './routes-shared-api.service';
import { IRoute } from './routes-interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    ApolloTestingModule,
    ApolloTestingController
} from 'apollo-angular/testing';

const TEST_ROUTE: IRoute[] = [
    {
        routeName: 'PnP LongMeadow DC',
        routeid: 18
    }
];

const TEST_API_ROUTE_RETURN = {
    data: {
        nodeDeliveryroutes: {
            edges: [
                {
                    node: {
                        routeName: 'PnP LongMeadow DC',
                        rowid: 18,
                    }
                }
            ]
        }
    }
};

describe('RoutesSharedApiService', () => {
    let backend: ApolloTestingController;
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ApolloTestingModule]
        })
    );
    beforeEach(() => {
        backend = TestBed.get(ApolloTestingController);
    });

    it('should be created', () => {
        const service: RoutesSharedApiService = TestBed.get(
            RoutesSharedApiService
        );
        expect(service).toBeTruthy();
    });

    it('should test routes graphQL api', done => {
        const service: RoutesSharedApiService = TestBed.get(RoutesSharedApiService);
        service.getAllRoutes().subscribe(result => {
            expect(result[0]).toEqual(TEST_ROUTE[0]);
            done();
        });
        backend.expectOne(service.GET_ROUTES_QUERY).flush(TEST_API_ROUTE_RETURN);
    });
});
