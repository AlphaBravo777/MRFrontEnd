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
    }

    collaps() {
        this.expandedIndex = !this.expandedIndex;
    }

    blurred() {
        console.log('I am gone now');
    }

}
