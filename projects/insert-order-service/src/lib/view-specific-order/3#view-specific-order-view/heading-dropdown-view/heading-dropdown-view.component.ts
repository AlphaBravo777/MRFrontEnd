import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { take, tap } from 'rxjs/operators';
import { IDate } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../#sharedServices/order.service';

@Component({
    selector: 'mr-insert-heading-dropdown-view',
    templateUrl: './heading-dropdown-view.component.html',
    styleUrls: ['./heading-dropdown-view.component.scss']
})
export class HeadingDropdownViewComponent implements OnInit, OnDestroy {

    dateToChangeToo: IDate;
    routeForm: FormGroup;
    subscription: Subscription;
    totalRoutes: IRoute[];
    refinedRoutesArray: IRoute[];

    constructor(private getDate$Service: GetDate$Service, private fb: FormBuilder,
        private orderService: OrderService) {}

    ngOnInit() {
        this.getTotalRoutes();
        this.getRouteInsertForm();
    }

    getLongDate(date: Date) {
        date = new Date(date.valueOf() + (120 * 60000));
        this.getDate$Service.getDatePackageForGivenLongDate(date).pipe(
            take(1),
            tap(newDate => this.dateToChangeToo = newDate),
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
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}
