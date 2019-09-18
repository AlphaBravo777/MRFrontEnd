import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IViewRoutesData } from './view-order-interface';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';

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
    private datePackageForSpecificRoute = new BehaviorSubject<IDate>(null);
    currentDatePackageForSpecificRoute$ = this.datePackageForSpecificRoute.asObservable();

    constructor() {}

    setPickedRoute(route: IViewRoutesData) {
        console.log(route);
        this.pickedRoute.next(route);
    }

    setDailyRoutes(routes: IRoute[]) {
        console.log('Charlie', routes);
        this.dailyRoutes.next(routes);
    }

    setSpecificRouteDatePackage(datePacakge: IDate) {
        this.datePackageForSpecificRoute.next(datePacakge);
    }

}
