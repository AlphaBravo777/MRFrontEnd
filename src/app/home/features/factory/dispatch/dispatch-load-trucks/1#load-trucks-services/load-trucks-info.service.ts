import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBasicRoute, ISingleTruckOrder, IRouteClient } from '../../$dispatch-services/dispatch-interface';
import { LoadTrucksService } from './load-trucks.service';

@Injectable({
    providedIn: 'root'
})
export class LoadTrucksInfoService {

private truck = new BehaviorSubject<ISingleTruckOrder>(null);
currentTruck$ = this.truck.asObservable();
private order = new BehaviorSubject<IRouteClient>(null);
currentOrder$ = this.order.asObservable();
private orderProduct = new BehaviorSubject<any>(null);
currentOrderProduct$ = this.orderProduct.asObservable();
private meatriteProduct = new BehaviorSubject<any>(null);
currentmeatriteProduct$ = this.meatriteProduct.asObservable();

    constructor(private loadTrucksService: LoadTrucksService) { }

    setTruck(truck: ISingleTruckOrder) {
        this.truck.next(truck);
    }

    setOrder(order) {
        console.log('Setting client data ', order);
        this.order.next(order);
    }

    setOrderProduct(orderProduct) {
        console.log('The order product that was changed = ', orderProduct);
        this.orderProduct.next(orderProduct);
        this.loadTrucksService.changeMeatriteStock();
    }

}
