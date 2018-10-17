import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToolboxGroupService {

    constructor() { }

    groupByArray(xs, key) {
        return xs.reduce(function (rv, x) {
            const v = key instanceof Function ? key(x) : x[key];
            const el = rv.find(r => r && r.key === v);
            if (el) {
                el.values.push(x);
            } else {
                rv.push({ key: v, values: [x], number: x.groupRanking });
            }
            return rv;
        }, []);
    }
}
