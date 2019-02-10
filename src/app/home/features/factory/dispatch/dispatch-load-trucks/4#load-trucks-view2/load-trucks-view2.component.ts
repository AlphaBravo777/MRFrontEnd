import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IRouteClient, IStockSingleProduct, IRouteWithTrucks, IRouteWorkingTree } from '../../$dispatch-services/dispatch-interface';
import { LoadTrucksInfoService } from '../1#load-trucks-services/load-trucks-info.service';

@Component({
    selector: 'app-load-trucks-view2',
    templateUrl: './load-trucks-view2.component.html',
    styleUrls: ['./load-trucks-view2.component.scss']
})
export class LoadTrucksView2Component implements OnInit, OnChanges {

    @Input() meatriteStock: IStockSingleProduct[];
    @Input() routeWithTrucks: IRouteWithTrucks;
    @Input() workingRouteTree: IRouteWorkingTree;
    clientData: IRouteClient;
    showLoadTruckTemplate: boolean;
    // truckNumber = 0;
    // clientNumber = 0;

    constructor(private loadTrucksInfoService: LoadTrucksInfoService) { }

    ngOnInit() {
    }

    loadClient(clientData: IRouteClient, num: number) {
        this.workingRouteTree.clientNumber = num;
        this.clientData = clientData;
        this.loadTrucksInfoService.setOrder(clientData);
        this.showLoadTruckTemplate = true;
    }

    changeTruck(truckNumber: number) {
        if (this.routeWithTrucks) {
            this.loadTrucksInfoService.setTruck(this.routeWithTrucks.trucks[truckNumber]);
        }
        // this.truckNumber = truckNumber;
        this.workingRouteTree.truckNumber = truckNumber;
        this.showLoadTruckTemplate = false;
    }

    truckTemplate(bool: boolean) {
        this.showLoadTruckTemplate = bool;
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log('View2 changes are: ', changes);
        if (this.routeWithTrucks) {
            if (changes.routeWithTrucks) {
                this.clientData = Object.assign({},
                    this.routeWithTrucks.trucks[this.workingRouteTree.truckNumber].clients[this.workingRouteTree.clientNumber]);
            }
        }
    }

}
