import { Component, OnInit } from '@angular/core';
import { ProcessedStockService } from './stock-services/processed-stock.service';
import { UserNavService } from '../../shared/user-nav/user-nav.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
    selector: 'app-stocks',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

    constructor(
        private processedStockService: ProcessedStockService,
        private userNav: UserNavService,
        private permissionsService: NgxPermissionsService) { }

    private permissions = [];

    ngOnInit() {
        this.userNav.getPermissions().subscribe(groups => {
            for (const key of Object.keys(groups.groups)) {
                this.permissions.push(groups.groups[key].name);
            }
            this.permissionsService.loadPermissions(this.permissions);
            console.log(this.permissions);
        });
    }

    confirmClearAllProducts() {
        this.processedStockService.confirmClearAllProducts();
    }
    confirmClearHalfProducts() {
        this.processedStockService.confirmClearHalfProducts();
    }
}
