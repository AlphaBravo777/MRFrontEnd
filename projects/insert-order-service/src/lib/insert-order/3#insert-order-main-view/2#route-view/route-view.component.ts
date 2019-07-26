import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { InsertOrderData$Service } from '../../1#insert-order-services/insert-order-data$.service';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { tap, switchMap, map } from 'rxjs/operators';
import { DynamicFormService } from 'src/app/home/shared/dynamic-form/dynamic-form-services/dynamic-form.service';
import {
    IFormControl,
    IFormSelectControl,
    IFormControlData
    } from 'src/app/home/shared/dynamic-form/dynamic-form-services/form-control-interface';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'mr-insert-route-view',
    templateUrl: './route-view.component.html',
    styleUrls: ['./route-view.component.scss']
})

export class RouteViewComponent implements OnInit, OnDestroy {

    // In this view we would like to have a place to set the route, we would have like to place the date as well, but this should be picked
    // in the top date menu. We can maybe just here show what the date is, and let it flash as needed

    subscription: Subscription;
    routesArray: IRoute[];
    @Input() routeFormControl: FormControl;
    placeHolderText = 'Start typing route name';
    caption = 'Route';

    constructor(private insertOrderDataService$: InsertOrderData$Service, private dynamicFormService: DynamicFormService) {}

    ngOnInit() {
        console.log(' control = ', this.routeFormControl);
        this.subscription = this.insertOrderDataService$.currentRoutes$.pipe(
            map(routes => this.routesArray = routes)
        ).subscribe();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
