import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRouteOrderClient, IBasicRoute, IDispatchStockDataMain } from '../../$dispatch-services/dispatch-interface';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-load-trucks-view1',
    templateUrl: './load-trucks-view1.component.html',
    styleUrls: ['./load-trucks-view1.component.scss']
})
export class LoadTrucksView1Component implements OnInit {

    private _templateData = new BehaviorSubject<IDispatchStockDataMain>(null);

    @Input() dailyRoutes: IBasicRoute[];  // To populate the dropdown list
    @Input() templateData: IDispatchStockDataMain;
    @Output() getDataForRoute: EventEmitter<any> = new EventEmitter<any>();
    @Output() loadTruck: EventEmitter<any> = new EventEmitter<any>(); // depricate
    showLoadTruckTemplate: boolean;
    clientData: IRouteOrderClient;
    truckNumber = 0;

    constructor() { }

    ngOnInit() {
        console.log('In the template the data = ', this.templateData);
    }

    getDataForRouteFunc(route) {
        this.showLoadTruckTemplate = false;
        this.truckNumber = 0;
        this.getDataForRoute.emit(route);
    }

    loadClient(clientData: IRouteOrderClient) {
        this.clientData = clientData;
        this.showLoadTruckTemplate = true;
    }

    changeTruck(truckNumber: number) {
        this.truckNumber = truckNumber;
    }

}


    // @Input()
    //     set templateData(value: IDispatchStockDataMain) {
    //         console.log('The value of template = ', value);
    //         this._templateData.next(value);
    //     }
    //     get templateData() {
    //         return this._templateData.getValue();
    //     }
