import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IViewRoutesData } from './view-order-interface';

@Injectable({
    providedIn: 'root'
})
export class ViewOrderData$Service {

    private pickedRoute = new BehaviorSubject<IViewRoutesData>(null);
    currentPickedRoute$ = this.pickedRoute.asObservable();

    constructor() {}

    setPickedRoute(route: IViewRoutesData) {
        this.pickedRoute.next(route);
    }

}
