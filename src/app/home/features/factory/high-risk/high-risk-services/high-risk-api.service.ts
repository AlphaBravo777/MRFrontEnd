import { Injectable } from '@angular/core';
import { IPackingListStock } from './high-risk-interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighRiskApiService {

    data: IPackingListStock[] = [
        { productCode: 'RV1', description: 'Red Vienna 1kg Vacuum', productGroup: 'Red Vienna', currentStock: 123, stockNeeded: 200 },
        { productCode: 'SV1', description: 'Smoke Vienna 1kg Vacuum', productGroup: 'Smoke Vienna', currentStock: 5, stockNeeded: 30 },
        { productCode: 'RG2', description: 'Red Griller 2kg Vacuum', productGroup: 'Red Vienna', currentStock: 65, stockNeeded: 100 },
        { productCode: 'CCV500', description: 'PnP Chicken & Cheese Vienna 500g', productGroup: 'PnP Premium', currentStock: 200, stockNeeded: 150 },
        { productCode: 'SV500', description: 'Smoke Vienna 500kg Vacuum', productGroup: 'Smoke Vienna', currentStock: 10, stockNeeded: 5 },
        { productCode: 'MRV1', description: 'Makro Red Vienna 1kg', productGroup: 'Red Vienna', currentStock: 5, stockNeeded: 7 },
        { productCode: 'PSV1', description: 'PnP Premium Smoke Vienna 1kg', productGroup: 'PnP Premium', currentStock: 50, stockNeeded: 200 },
    ];

  constructor() { }

    getHardCodedPackingListData(): Observable<IPackingListStock[]> {
        return of(this.data);
    }

}
