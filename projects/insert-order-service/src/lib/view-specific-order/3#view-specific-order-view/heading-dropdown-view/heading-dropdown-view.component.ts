import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { take, tap, concatMap, switchMap, finalize } from 'rxjs/operators';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../#sharedServices/order.service';
import { IViewRoutesData } from '../../../view-orders/1#view-order-services/view-order-interface';
import { Router } from '@angular/router';
import { ViewSpecificOrderService } from '../../1#view-specific-order-services/view-specific-order.service';

@Component({
    selector: 'mr-insert-heading-dropdown-view',
    templateUrl: './heading-dropdown-view.component.html',
    styleUrls: ['./heading-dropdown-view.component.scss']
})
export class HeadingDropdownViewComponent implements OnInit, OnDestroy {

    @Input() totalRouteWeight: number;
    @Input() totalRouteWeightWithCrates: number;
    @Input() currentRoute: IViewRoutesData;
    dateToChangeToo: IDate;
    routeForm: FormGroup;
    subscription: Subscription;
    subscription2: Subscription;
    subscription3: Subscription;
    totalRoutes: IRoute[];
    refinedRoutesArray: IRoute[];

    constructor(private getDate$Service: GetDate$Service,
        private fb: FormBuilder,
        private orderService: OrderService,
        private router: Router,
        private viewSpecificOrderService: ViewSpecificOrderService,
        ) {}

    ngOnInit() {
        this.getTotalRoutes();
        this.getRouteInsertForm();
    }

    getLongDate(date: Date) {
        date = new Date(date.valueOf() + (120 * 60000));
        this.subscription2 = this.getDate$Service.getDatePackageForGivenLongDate(date).pipe(
            take(1),
            tap(newDate => this.dateToChangeToo = newDate),
            switchMap(() => this.getDate$Service.currentDatePackage$.pipe(
                take(1)
            )),
            switchMap(currentDate => this.orderService.updateRouteDate(this.currentRoute, currentDate, this.dateToChangeToo)),
            tap(result => console.log('Return data = ', result)),
            finalize(() => this.router.navigate(['/main/admin-office/insertOrderService/entry/view-orders/view-order']))
        ).subscribe();
    }

    getRouteInsertForm() {
        this.routeForm = this.fb.group({
            routeName: [null, [Validators.required, Validators.minLength(3)]],
            routeid: [null, [Validators.required, Validators.minLength(1)]],
        });
    }

    userRouteSelection(routeString: string) {
        this.refinedRoutesArray = [];
        this.totalRoutes.forEach(route => {
            if (route.routeName.toUpperCase().includes(routeString.toUpperCase())) {
                this.refinedRoutesArray.push(route);
            }
        });
        if (this.refinedRoutesArray.length === 1) {
            this.routeSelection(this.refinedRoutesArray[0]);
        }
    }

    routeSelection(route: IRoute) {
        this.routeForm.get('routeName').setValue(route.routeName);
        this.routeForm.get('routeid').setValue(route.routeid);
        this.refinedRoutesArray.length = 0;
    }

    getTotalRoutes() {
        this.subscription = this.orderService.getAllRoutes().pipe(
            tap(routes => this.totalRoutes = routes)
        ).subscribe();
    }

    changeRouteOrdersDetail() {
        console.log('Route will now be changed');
        // Create the code that will change the route name for all the orders
        // You do not have to get all the orders and change them, just give through the route name and date,
        // and then filter and change server side
    }

    refreshWeeklyOrders() {
        console.log('Weekly orders will now be refreshed');
        this.subscription3 = this.viewSpecificOrderService.refreshWeeklyOrdersCache().pipe(
            take(1),
            tap(response => console.log('The response = ', response)),
            finalize(() => this.router.navigate(['/main/admin-office/insertOrderService/entry/view-orders/view-specific-order']))
        ).subscribe();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
        }
        if (this.subscription3) {
            this.subscription3.unsubscribe();
        }
    }

}
