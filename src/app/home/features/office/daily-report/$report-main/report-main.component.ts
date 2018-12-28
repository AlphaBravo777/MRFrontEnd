import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-report-main',
    templateUrl: './report-main.component.html',
    styleUrls: ['./report-main.component.scss']
})
export class ReportMainComponent implements OnInit {

    showEntryBox = false;

    constructor() { }

    ngOnInit() {
    }

    showEntry() {
        this.showEntryBox = !this.showEntryBox;
    }

}
