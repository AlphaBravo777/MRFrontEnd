import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BatchGroupApiService } from './batch-group-api.service';
import { BatchGroupGraphqlApiService } from './batch-group-graphql-api.service';
import { IBatchGroup, IBatchColor } from './batch-group-interface';

@Injectable({
    providedIn: 'root'
})
export class BatchGroupService {

    constructor(
        private batchGroupApi: BatchGroupApiService,
        private batchGroupApiGraphQlService: BatchGroupGraphqlApiService) { }

    getAllBatchGroups(): Observable<IBatchGroup[]> {
        return this.batchGroupApiGraphQlService.getAllBatchGroups().pipe();
    }

    getAllBatchColors(): Observable<IBatchColor[]> {
        return this.batchGroupApiGraphQlService.getAllBatchColors().pipe();
    }
}
