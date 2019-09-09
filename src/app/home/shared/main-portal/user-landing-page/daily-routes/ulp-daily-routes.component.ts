import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-ulp-daily-routes',
    templateUrl: './ulp-daily-routes.component.html',
    styleUrls: ['./ulp-daily-routes.component.scss']
})
export class UlpDailyRoutesComponent implements OnInit {

    componentExpanded: boolean;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {}

    showDailyRoutes() {
        if (!this.componentExpanded) {
            console.log('The daily Rotues should be loaded now');
            // this.router.navigate(['/main/landing-page/entry/menu/daily/daily-report/report-read']);
            this.router.navigate([{outlets: {routes: 'routes/insertOrderService/entry/view-orders/view-order'}}],
            {relativeTo: this.route, skipLocationChange: true});
        } else {
            this.router.navigate(['/main/landing-page/entry/menu']);
        }
        this.componentExpanded = !this.componentExpanded;
    }
}
