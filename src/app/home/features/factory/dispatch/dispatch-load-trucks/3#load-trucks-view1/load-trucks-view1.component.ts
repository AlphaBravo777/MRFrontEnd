import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBasicRoute } from '../../$dispatch-services/dispatch-interface';
import { LoadTrucksInfoService } from '../1#load-trucks-services/load-trucks-info.service';

@Component({
    selector: 'app-load-trucks-view1',
    templateUrl: './load-trucks-view1.component.html',
    styleUrls: ['./load-trucks-view1.component.scss']
})
export class LoadTrucksView1Component implements OnInit {

    @Input() dailyRoutes: IBasicRoute[];  // To populate the dropdown list
    @Output() getDataForRoute: EventEmitter<any> = new EventEmitter<any>();
    @Output() truckNumber: EventEmitter<number> = new EventEmitter<number>();
    @Output() showLoadTruckTemplate: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private loadTrucksInfoService: LoadTrucksInfoService) { }

    ngOnInit() {

    }

    getDataForRouteFunc(routeid) {
        this.showLoadTruckTemplate.emit(false);
        this.truckNumber.emit(0);
        const routeObject = this.getRouteObject(parseInt(routeid, 10));
        this.getDataForRoute.emit(routeObject);
    }

    getRouteObject(routeid: number): IBasicRoute {
        return this.dailyRoutes.find((route) => route.routeid === routeid);
    }

}
