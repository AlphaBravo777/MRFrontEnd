import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRouteOrder, IRouteTemplateData } from '../../$dispatch-services/dispatch-interface';

@Component({
    selector: 'app-load-trucks-view1',
    templateUrl: './load-trucks-view1.component.html',
    styleUrls: ['./load-trucks-view1.component.scss']
})
export class LoadTrucksView1Component implements OnInit {

    @Input() routes: IRouteOrder[];
    @Input() templateData: IRouteTemplateData;
    @Input() clientInfo;
    @Output() getDataForRoute: EventEmitter<any> = new EventEmitter<any>();
    @Output() loadTruck: EventEmitter<any> = new EventEmitter<any>();
    @Output() loadClient: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

}
