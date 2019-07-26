import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoutesSharedApiService } from 'src/app/home/shared/services/routesServices/routes-shared-api.service';
import { take, tap } from 'rxjs/operators';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';

@Injectable({
    providedIn: 'root'
})
export class InsertOrderData$Service {

    private routes = new BehaviorSubject<IRoute[]>(null);
    currentRoutes$ = this.routes.asObservable();

    constructor(private routesSharedAPIService: RoutesSharedApiService) {
        this.getRoutes();
    }

    getRoutes() {
        this.routesSharedAPIService.getAllRoutes().pipe(
            take(1),
            tap(data => console.log('Here are the routes data', data)),
            tap(data => this.routes.next(data))
        ).subscribe();
    }
}
