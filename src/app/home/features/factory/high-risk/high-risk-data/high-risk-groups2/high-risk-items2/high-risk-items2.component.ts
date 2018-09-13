import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-high-risk-items2',
    templateUrl: './high-risk-items2.component.html',
    styleUrls: ['./high-risk-items2.component.css']
})
export class HighRiskItems2Component implements OnInit {

    @Input() productData;

    expandedIndex;
    constructor() { }

    ngOnInit() {
        this.expandedIndex = false;
    }

    collaps() {
        this.expandedIndex = !this.expandedIndex;
    }

}
