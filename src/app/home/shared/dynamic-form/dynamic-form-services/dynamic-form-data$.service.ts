import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormData$Service {

    constructor() { }

    private filterInputData = new BehaviorSubject<object>({test: ['One', 'Two', 'Three']});
    currentFilterInputData$ = this.filterInputData.asObservable();

    addFilterData(newData: object) {
        console.log('New filter data = ', newData);
        this.filterInputData.next(newData);
    }

}
