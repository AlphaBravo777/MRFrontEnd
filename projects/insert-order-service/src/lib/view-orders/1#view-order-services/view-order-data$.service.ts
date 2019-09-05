import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IViewRoutesData } from './view-order-interface';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';

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
    private dailyRoutes = new BehaviorSubject<IRoute[]>([]);
    currentDailyRoute$ = this.dailyRoutes.asObservable();

    constructor() {}

    setPickedRoute(route: IViewRoutesData) {
        console.log(route);
        this.pickedRoute.next(route);
    }

    setDailyRoutes(routes: IRoute[]) {
        console.log('Charlie', routes);
        this.dailyRoutes.next(routes);
    }

}
