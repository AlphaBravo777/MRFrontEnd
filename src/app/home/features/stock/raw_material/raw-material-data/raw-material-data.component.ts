import { Component, OnInit, OnDestroy } from '@angular/core';
import { RawMaterialDataService } from '../raw-material-services/raw-material-data.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-raw-material-data',
    templateUrl: './raw-material-data.component.html',
    styleUrls: ['./raw-material-data.component.css']
})
export class RawMaterialDataComponent implements OnInit, OnDestroy {

    rawMaterialProductData;
    subscription;

    constructor(public rawMaterialDataService: RawMaterialDataService) { }

    ngOnInit() {
        this.subscription = interval(30000)
        .pipe(
            startWith(0),
            switchMap(() => this.rawMaterialDataService.returnData())
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
