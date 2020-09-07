import { TestBed } from '@angular/core/testing';
import { SpecificRouteTableService } from './specific-route-table.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IRow } from './table.interface';

describe('SpecificRouteTableService', () => {

    const productsTableArray: IRow[] = [{classColmString: null, colmString: null, element: [
            {accountid: null, classDivString: null, classSpanString: null, value: 'aaaaa'},
            {accountid: null, classDivString: null, classSpanString: null, value: 'bbbbbbbbbb'}
        ]
    }];

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, ApolloTestingModule, RouterTestingModule]
    }));

    it('should be created', () => {
        const service: SpecificRouteTableService = TestBed.get(SpecificRouteTableService);
        expect(service).toBeTruthy();
    });

    // for a long time this gave an error that 'element' was undefined, and when creating a another test is just started working
    it('should calculate longest heading', () => {
        const service: SpecificRouteTableService = TestBed.get(SpecificRouteTableService);
        expect(service.calculateLongestHeading(productsTableArray)).toEqual(10);
    });

    // // for a long time this gave an error that 'element' was undefined, and when creating a another test is just started working
    // it('should calculate longest heading', () => {
    //     const service: SpecificRouteTableService = TestBed.get(SpecificRouteTableService);
    //     expect(service['createRowColmDivSpanValue'](productsTableArray)).toEqual(10);
    // });

});
