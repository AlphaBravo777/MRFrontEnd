import { Injectable } from '@angular/core';
import { IPackingListStock } from './high-risk-interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighRiskApiService {

    data: IPackingListStock[] = [
        /* tslint:disable */
        { productCode: 'RV1', description: 'Red Vienna 1kg Vacuum', productGroup: 'Red Vienna', currentStock: 123, stockNeeded: 200 },
        { productCode: 'SV1', description: 'Smoke Vienna 1kg Vacuum', productGroup: 'Smoke Vienna', currentStock: 5, stockNeeded: 70 },
        { productCode: 'RG2', description: 'Red Griller 2kg Vacuum', productGroup: 'Red Vienna', currentStock: 65, stockNeeded: 100 },
        { productCode: 'CCV500', description: 'PnP Chicken & Cheese Vienna 500g', productGroup: 'PnP Premium', currentStock: 200, stockNeeded: 150 },
        { productCode: 'SV500', description: 'Smoke Vienna 500kg Vacuum', productGroup: 'Smoke Vienna', currentStock: 15, stockNeeded: 12 },
        { productCode: 'MRV1', description: 'Makro Red Vienna 1kg', productGroup: 'Red Vienna', currentStock: 5, stockNeeded: 7 },
        { productCode: 'PSV1', description: 'PnP Premium Smoke Vienna 1kg', productGroup: 'PnP Premium', currentStock: 50, stockNeeded: 200 },
        { productCode: 'RV1', description: 'Red Vienna 1kg Vacuum', productGroup: 'Red Vienna', currentStock: 123, stockNeeded: 20 },
        { productCode: 'SV1', description: 'Smoke Vienna 1kg Vacuum', productGroup: 'Smoke Vienna', currentStock: 10, stockNeeded: 40 },
        { productCode: 'RG2', description: 'Red Griller 2kg Vacuum', productGroup: 'Red Vienna', currentStock: 65, stockNeeded: 10 },
        { productCode: 'CCV500', description: 'PnP Chicken & Cheese Vienna 500g', productGroup: 'PnP Premium', currentStock: 260, stockNeeded: 150 },
        { productCode: 'SV500', description: 'Smoke Vienna 500kg Vacuum', productGroup: 'Smoke Vienna', currentStock: 30, stockNeeded: 9 },
        { productCode: 'MRV1', description: 'Makro Red Vienna 1kg', productGroup: 'Red Vienna', currentStock: 5, stockNeeded: 7 },
        { productCode: 'PSV1', description: 'PnP Premium Smoke Vienna 1kg', productGroup: 'PnP Premium', currentStock: 50, stockNeeded: 210 },
        { productCode: 'RV500', description: 'Red Vienna 1kg Vacuum', productGroup: 'Red Vienna', currentStock: 13, stockNeeded: 2 },
        { productCode: 'SV2', description: 'Smoke Vienna 1kg Vacuum', productGroup: 'Smoke Vienna', currentStock: 5, stockNeeded: 30 },
        { productCode: 'RG500', description: 'Red Griller 2kg Vacuum', productGroup: 'Red Vienna', currentStock: 6, stockNeeded: 10 },
        { productCode: 'CCV1', description: 'PnP Chicken & Cheese Vienna 500g', productGroup: 'PnP Premium', currentStock: 230, stockNeeded: 159 },
        { productCode: 'SG2', description: 'Smoke Vienna 500kg Vacuum', productGroup: 'Smoke Vienna', currentStock: 10, stockNeeded: 5 },
        { productCode: 'MRV500', description: 'Makro Red Vienna 1kg', productGroup: 'Red Vienna', currentStock: 5, stockNeeded: 7 },
        { productCode: 'PSV500', description: 'PnP Premium Smoke Vienna 1kg', productGroup: 'PnP Premium', currentStock: 300, stockNeeded: 280 },
        /* tslint:enable */
    ];

  constructor() { }

    getHardCodedPackingListData(): Observable<IPackingListStock[]> {
        return of(this.data);
    }

}
