import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { RawMaterialDataService } from '../../raw-material-services/raw-material-data.service';

@Component({
    selector: 'app-raw-stock-view-data',
    templateUrl: './raw-stock-view-data.component.html',
    styleUrls: ['./raw-stock-view-data.component.css']
})
export class RawStockViewDataComponent implements OnInit, OnDestroy {

    rawMaterialProductData;
    subscription;

    constructor(public rawMaterialDataService: RawMaterialDataService) { }

    ngOnInit() {
        this.subscription = interval(30000)
        .pipe(
            startWith(0),
            switchMap(() => this.rawMaterialDataService.returnData())       // (2*85)+80+75+115+110
        )
        .subscribe(data => {
            console.log(data);
            this.rawMaterialProductData = data;
        });

        // this.subscription = interval(3000)
        // .pipe(
        //     startWith(0),
        //     switchMap(() => this.rawMaterialDataService.getGraphQLdata())
        // )
        // .subscribe(data => {
        //     this.rawMaterialProductData = data;
        // });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
