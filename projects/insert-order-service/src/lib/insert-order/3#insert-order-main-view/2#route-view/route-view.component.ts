import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { InsertOrderData$Service } from '../../1#insert-order-services/insert-order-data$.service';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { map } from 'rxjs/operators';
import { DynamicFormService } from 'src/app/home/shared/dynamic-form/dynamic-form-services/dynamic-form.service';
import { FormControl } from '@angular/forms';
import { InsertFormChangesService } from '../../1#insert-order-services/insert-form-changes.service';

@Component({
    selector: 'mr-insert-route-view',
    templateUrl: './route-view.component.html',
    styleUrls: ['./route-view.component.scss']
})

export class RouteViewComponent implements OnInit, OnDestroy {

    // In this view we would like to have a place to set the route, we would have like to place the date as well, but this should be picked
    // in the top date menu. We can maybe just here show what the date is, and let it flash as needed

    @Input() routeNameFormControl: FormControl;
    @Input() routeidFormControl: FormControl;
    refinedRoutesArray: IRoute[] = [];
    subscription: Subscription;
    routesArray: IRoute[];
    placeHolderText = 'Start typing route name';
    caption = 'Route';

    constructor(private insertOrderDataService$: InsertOrderData$Service,
        private insertFormChangesService: InsertFormChangesService) {}

    ngOnInit() {
        this.subscription = this.insertOrderDataService$.currentRoutes$.pipe(
            map(routes => this.routesArray = routes)
        ).subscribe();
    }

    routeSelection(route: IRoute) {
        this.insertFormChangesService.insertRouteDetails(route);

        this.refinedRoutesArray = [];
    }

    userRouteSelection(routeString: string) {
        this.refinedRoutesArray = [];
        this.routesArray.forEach(route => {
            if (route.routeName.toUpperCase().includes(routeString.toUpperCase())) {
                this.refinedRoutesArray.push(route);
            }
        });
        if (this.refinedRoutesArray.length === 1) {
            this.routeSelection(this.refinedRoutesArray[0]);
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
