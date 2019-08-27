import { Component, OnInit, Input } from '@angular/core';
import { IViewRoutesData } from '../1#view-order-services/view-order-interface';

@Component({
    selector: 'mr-insert-view-order-main-view',
    templateUrl: './view-order-main-view.component.html',
    styleUrls: ['./view-order-main-view.component.scss']
})
export class ViewOrderMainViewComponent implements OnInit {

    @Input() smallRoutesForDay: IViewRoutesData[];
    @Input() totalWeightForTheDay: number;

    constructor() {}

    ngOnInit() {}
}
