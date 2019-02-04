import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-load-widget',
    templateUrl: './load-widget.component.html',
    styleUrls: ['./load-widget.component.scss']
})
export class LoadWidgetComponent implements OnInit {

    @Input() amountNeeded: number;
    amountLoaded = 0;

    constructor() { }

    ngOnInit() {
    }

    load(amount) {
        this.amountLoaded = this.amountLoaded + amount;
    }

    // make truck amount go down to zero to show what is need. When just start and needing 35, the let amount show -35, to show that you
    // need to plus to get it to zero. When you have 2 too many, then show +2 to show that you have to minus to be equal.
    // In the end the middle numbers must all be zero.
    // The number isn the begging must show how many is loaded, of the total. 0/35 or 12/35 or 35/35

}
