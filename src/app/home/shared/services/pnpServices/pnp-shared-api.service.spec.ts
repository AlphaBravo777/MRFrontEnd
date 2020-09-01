import { TestBed } from '@angular/core/testing';
import {
    ApolloTestingModule,
    ApolloTestingController
} from 'apollo-angular/testing';

import { PnpSharedApiService } from './pnp-shared-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { IPnPOrder, IPnPOrderProduct } from './pnp-shared-interfaces';

// const TEST_DATA_PRODUCTS: IPnPOrderProduct[] = [
//     {
//         productMRid: 'CV1NN',
//         productid: 9,
//         amount: 39,
//         lugSize: 2,
//         packageWeight: 12,
//         rankingInGroup: 13,
//     }
// ];

// const TEST_DATA_ORDER: IPnPOrder = {
//         accountID: 'MA09',
//         commonName: 'KZN - PnP Premium/NN',
//         orderDate: '2019-05-24',
//         delivered: false,
//         products: TEST_DATA_PRODUCTS
//     }
// ;

const TEST_SEARCH = {
    data: {
        nodeOrderdetails: {
            edges: [
                {
                    node: {
                        accountsid: { accountID: 'MA09' },
                        commonName: 'KZN - PnP Premium/NN',
                        orderDate: '2019-05-24',
                        delivered: false,
                        orderproductamountsSet: {
                            edges: [
                                {
                                    node: {
                                        amount: 39,
                                        productid: {
                                            rowid: 9,
                                            productid: 'CV1NN',
                                            packageweight: 12,
                                            rankingInGroup: 13,
                                            packaging: {
                                                rowid: 8
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    }
};

describe('PnpSharedApiService', () => {
    let backend: ApolloTestingController;

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ApolloTestingModule],
        })
    );
    beforeEach(() => {
        backend = TestBed.get(ApolloTestingController);
    });

    it('should be created', () => {
        const service: PnpSharedApiService = TestBed.get(PnpSharedApiService);
        expect(service).toBeTruthy();

    });

    // it('should test search', done => {
    //     const service: PnpSharedApiService = TestBed.get(PnpSharedApiService);
    //     service.getPnPOrder({ id: null }).subscribe(result => {
    //         expect(result[0]).toEqual(TEST_DATA_ORDER);
    //         done();
    //     });
    //     backend.expectOne(service.GET_PNP_ORDER_QUERY).flush(TEST_SEARCH);
    // });
});
