import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IOrderDBDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';

@Injectable({
    providedIn: 'root'
})
export class ViewWeeklyOrdersService {

    constructor() {}

    getWeeklyOrders(): Observable<IOrderDBDetails[]> {
        return of([]);
    }
}
