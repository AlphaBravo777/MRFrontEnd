import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-high-risk-groups2',
    templateUrl: './high-risk-groups2.component.html',
    styleUrls: ['./high-risk-groups2.component.css']
})
export class HighRiskGroups2Component implements OnInit {

    @Input() loadingListStock;

    constructor() { }

    ngOnInit() {
    }

}
