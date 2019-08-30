import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IViewRoutesData } from './view-order-interface';

@Injectable({
    providedIn: 'root'
})
export class ViewOrderData$Service {

    private pickedRoute = new BehaviorSubject<IViewRoutesData>({
        routeAmountPercentage: undefined,
        routeAmountTotal: undefined,
        routeName: undefined,
        routeid: 0.1  // So that no routes will return by default
    });
    currentPickedRoute$ = this.pickedRoute.asObservable();

    constructor() {}

    setPickedRoute(route: IViewRoutesData) {
        this.pickedRoute.next(route);
    }

}
