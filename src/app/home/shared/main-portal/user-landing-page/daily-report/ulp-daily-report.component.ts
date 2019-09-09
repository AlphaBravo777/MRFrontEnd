import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-ulp-daily-report',
    templateUrl: './ulp-daily-report.component.html',
    styleUrls: ['./ulp-daily-report.component.scss']
})
export class UlpDailyReportComponent implements OnInit {

    componentExpanded: boolean;

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {}

    showDailyReport() {
        if (!this.componentExpanded) {
        console.log('The daily Report should be loaded now');
        // this.router.navigate(['/main/landing-page/entry/menu/daily/daily-report/report-read']);
        this.router.navigate([{outlets: {daily: 'daily/daily-report/report-read'}}],
        {relativeTo: this.route, skipLocationChange: true});
        } else {
            this.router.navigate(['/main/landing-page/entry/menu']);
        }
        this.componentExpanded = !this.componentExpanded;
    }
}
