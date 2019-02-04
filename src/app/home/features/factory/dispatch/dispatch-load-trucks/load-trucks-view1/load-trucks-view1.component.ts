import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRouteOrder, IRouteTemplateData, IRouteOrderClient } from '../../$dispatch-services/dispatch-interface';

@Component({
    selector: 'app-load-trucks-view1',
    templateUrl: './load-trucks-view1.component.html',
    styleUrls: ['./load-trucks-view1.component.scss']
})
export class LoadTrucksView1Component implements OnInit {

    @Input() dailyRoutes: IRouteOrder[];
    @Input() templateData: IRouteTemplateData;
    @Output() getDataForRoute: EventEmitter<any> = new EventEmitter<any>();
    @Output() loadTruck: EventEmitter<any> = new EventEmitter<any>();
    showLoadTruckTemplate: boolean;
    clientData: IRouteOrderClient;

    constructor() { }

    ngOnInit() {
    }

    getDataForRouteFunc(route) {
        this.showLoadTruckTemplate = false;
        this.getDataForRoute.emit(route);
    }

    loadClient(clientData: IRouteOrderClient) {
        this.clientData = clientData;
        this.showLoadTruckTemplate = true;
    }

}
