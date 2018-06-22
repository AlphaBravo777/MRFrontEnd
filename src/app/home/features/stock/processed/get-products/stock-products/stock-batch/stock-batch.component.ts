import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-stock-batch',
    templateUrl: './stock-batch.component.html',
    styleUrls: ['./stock-batch.component.css']
})
export class StockBatchComponent implements OnInit {

    private _batchName = new BehaviorSubject<any>([]);
    @Input()
    set batchName(value) {
        this._batchName.next(value);
    }
    get batchName() {
        return this._batchName.getValue();
    }

    constructor() { }

    ngOnInit() {
        if (!this.batchName) {
            this.batchName = 'Russian';
        }
        console.log(this.batchName);
    }

}
