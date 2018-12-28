import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-high-risk-groups2',
    templateUrl: './high-risk-groups2.component.html',
    styleUrls: ['./high-risk-groups2.component.css']
})
export class HighRiskGroups2Component implements OnInit {


    @Input() loadingListStock;
    expandedIndex: number;
    allExpandState = false;

    constructor() { }


    ngOnInit() {
        console.log(this.loadingListStock);
        this.expandedIndex = -1;
    }

    Collaps(index: number) {
        this.expandedIndex = index === this.expandedIndex ? -1 : index;
        }

    // TODO: the expand all and collaps is not working very nicely together

}
