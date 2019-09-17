import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'mr-insert-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {}

    ordersLoadingToday() {
        console.log('We are loading today');
        // this.router.navigate(['/main/admin-office/insertOrderService/entry/view-orders/view-order']);
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
