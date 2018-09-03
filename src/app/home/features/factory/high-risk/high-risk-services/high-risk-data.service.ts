import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HighRiskApiService } from './high-risk-api.service';
import { IPackingListStock } from './high-risk-interfaces';

@Injectable({
    providedIn: 'root'
})
export class HighRiskDataService {
    constructor(private highRiskApiService: HighRiskApiService) {}

    groupProducts(): Observable<IPackingListStock[]> {
        return this.highRiskApiService
            .getHardCodedPackingListData()
            .pipe(map(products => this.doMoreCalcWithproducts(products)));
    }

    private doMoreCalcWithproducts(products): IPackingListStock[] {
        const prod = this.groupByArray(products, 'productGroup');
        return prod;
    }

    groupByArray(xs, key) {
        return xs.reduce(function(rv, x) {
            const v = key instanceof Function ? key(x) : x[key];
            const el = rv.find(r => r && r.key === v);
            if (el) {
                el.values.push(x);
            } else {
                rv.push({ key: v, values: [x] });
            }
            return rv;
        }, []);
    }
}
