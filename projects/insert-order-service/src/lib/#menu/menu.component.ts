import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePickerService } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-picker.service';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { take, tap } from 'rxjs/operators';
import { ViewOrderData$Service } from '../view-orders/1#view-order-services/view-order-data$.service';

@Component({
    selector: 'mr-insert-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    loadingOrdersDateDifference = 1;

    constructor(private router: Router,
        private getDateService: GetDate$Service,
        private viewOrdersDataService: ViewOrderData$Service) {}

    ngOnInit() {
        // This does nothing when you pass it null, you can rather move this into the component
        this.viewOrdersDataService.setSpecificRouteDatePackage(null);  
    }

    ordersLoadingToday() {
        console.log('We are loading today');
        // There is no reason why we can not just do this when we are loading the component
        this.getDateService.getDatePackageForCurrentDateMinusOrPlusDays(this.loadingOrdersDateDifference).pipe(
            take(1),
            tap(datePackage => this.viewOrdersDataService.setSpecificRouteDatePackage(datePackage)),
            tap(() => this.router.navigate(['/main/admin-office/insertOrderService/entry/view-orders/view-order']))
        ).subscribe();
    }

    ordersDeliveringToday() {
        console.log('We are delivering today');
        this.router.navigate(['/main/admin-office/insertOrderService/entry/view-orders/view-order']);
    }

    ordersInsert() {
        this.router.navigate(['/main/admin-office/insertOrderService/entry/insert-order']);
        console.log('Inserting Orders');
    }

    ordersPnPCSVFileInsert() {
        this.router.navigate(['/main/admin-office/insertOrderService/entry/insertPnPCSV']);
    }
}

// <a routerLink="../view-orders/view-order" routerLinkActive="active"><button class='niceButton meatriteButton'>View Orders</button></a>
// <a routerLink="../insertPnPCSV" routerLinkActive="active"><button class='niceButton meatriteButton'>Add PnP CSV Orders</button></a>
