import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IBatchGroup } from '../1#insert-batch-group-services/batch-group-interface';


@Component({
    selector: 'mr-product-insert-batch-group-view',
    templateUrl: './insert-batch-group-view.component.html',
    styleUrls: ['./insert-batch-group-view.component.scss']
})
export class InsertBatchGroupViewComponent implements OnInit {

    constructor() { }

    @Input() batchGroupData: IBatchGroup[];
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    displayedColumns: string[] = ['batchName', 'ranking', 'packingListRanking'];
    dataSource: MatTableDataSource<any>;

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.batchGroupData);
        setTimeout(() => this.dataSource.sort = this.sort);
    }

    batchNameSelected(batch) {
        console.log('There was a batch selected', batch);
    }

}
