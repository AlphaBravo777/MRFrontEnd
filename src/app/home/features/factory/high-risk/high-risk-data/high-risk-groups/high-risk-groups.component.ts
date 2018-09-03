import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-high-risk-groups',
    templateUrl: './high-risk-groups.component.html',
    styleUrls: ['./high-risk-groups.component.css']
})
export class HighRiskGroupsComponent implements OnInit {

    @Input() loadingListStock;

    constructor() {}

    ngOnInit() {

    }
}
