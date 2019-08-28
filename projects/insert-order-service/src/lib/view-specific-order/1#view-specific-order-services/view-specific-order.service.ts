import { Injectable } from '@angular/core';
import { ViewOrderData$Service } from '../../view-orders/1#view-order-services/view-order-data$.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ViewSpecificOrderService {

    constructor(private viewOrderData$Service: ViewOrderData$Service,
        private getDateService: GetDate$Service) {}

    getViewSpecificOrderInitialData(): Observable<IOrderDetails> {
        const datePackage$ = this.getDateService.currentDatePackage$;
        const selectedRoute$ = this.viewOrderData$Service.currentPickedRoute$;
        // return combineLatest([datePackage$, selectedRoute$]).pipe(
        //     // switchMap(data => console.log('The combine data = ', data[0], data[1]))

        // );
        return of(null);
    }
}
