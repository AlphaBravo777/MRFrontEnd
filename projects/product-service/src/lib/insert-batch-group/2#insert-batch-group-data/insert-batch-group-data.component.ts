import { Component, OnInit } from '@angular/core';
import { BatchGroupService } from '../1#insert-batch-group-services/batch-group.service';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { IBatchGroup } from '../1#insert-batch-group-services/batch-group-interface';

@Component({
    selector: 'mr-product-insert-batch-group-data',
    templateUrl: './insert-batch-group-data.component.html',
    styleUrls: ['./insert-batch-group-data.component.scss']
})
export class InsertBatchGroupDataComponent implements OnInit {

    batchGroupData: IBatchGroup[] = [];
    subscription: Subscription;

    constructor(private batchGroupService: BatchGroupService) { }

    ngOnInit() {
        this.subscription = this.batchGroupService.getAllBatchGroups().pipe(
            take(1),
            tap(batchGroups => this.batchGroupData = batchGroups)
        ).subscribe();
    }

}
