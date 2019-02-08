import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IDispatchStockDataMain, IRouteClient } from '../../$dispatch-services/dispatch-interface';
import { LoadTrucksInfoService } from '../1#load-trucks-services/load-trucks-info.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-load-trucks-view2',
    templateUrl: './load-trucks-view2.component.html',
    styleUrls: ['./load-trucks-view2.component.scss']
})
export class LoadTrucksView2Component implements OnInit, OnChanges {

    @Input() templateData: IDispatchStockDataMain;
    showLoadTruckTemplate: boolean;
    clientData: IRouteClient;
    truckNumber = 0;
    subscription: Subscription;

    constructor(private loadTrucksInfoService: LoadTrucksInfoService) { }

    ngOnInit() {
    }

    loadClient(clientData: IRouteClient) {
        this.clientData = clientData;
        this.loadTrucksInfoService.setOrder(clientData);
        this.showLoadTruckTemplate = true;
    }

    changeTruck(truckNumber: number) {
        if (this.templateData.route) {
            this.loadTrucksInfoService.setTruck(this.templateData.route.trucks[truckNumber]);
        }
        this.truckNumber = truckNumber;
        this.showLoadTruckTemplate = false;
    }

    truckTemplate(bool: boolean) {
        this.showLoadTruckTemplate = bool;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.templateData) {
            console.log('Main changes are running');
        }
    }

}
