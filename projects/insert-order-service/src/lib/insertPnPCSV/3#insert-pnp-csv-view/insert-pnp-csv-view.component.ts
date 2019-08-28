import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'mr-insert-insert-pnp-csv-view',
    templateUrl: './insert-pnp-csv-view.component.html',
    styleUrls: ['./insert-pnp-csv-view.component.scss']
})
export class InsertPnpCsvViewComponent implements OnInit {

    @Output() fileSelected: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}

    fileSelect(event) {
        this.fileSelected.emit(event);
    }
}
