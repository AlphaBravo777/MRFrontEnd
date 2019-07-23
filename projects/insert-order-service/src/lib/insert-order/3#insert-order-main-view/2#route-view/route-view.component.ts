import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mr-insert-route-view',
    templateUrl: './route-view.component.html',
    styleUrls: ['./route-view.component.scss']
})

export class RouteViewComponent implements OnInit {
    // In this view we would like to have a place to set the route, we would have like to place the date as well, but this should be picked
    // in the top date menu. We can maybe just here show what the date is, and let it flash as needed

    constructor() {}

    ngOnInit() {}
}
