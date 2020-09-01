import { Injectable } from '@angular/core';
import { ChecklistReadApiService } from './checklist-read-api.service';
import { IChecksSingleArea, IChecklistArea } from '../../checklist-services/checklist-interface';
import { Observable } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { ChecklistService } from '../../checklist-services/checklist.service';

@Injectable({
    providedIn: 'root'
})
export class ChecklistReadService {

    constructor(
        private checklistReadApiService: ChecklistReadApiService,
        private toolbox: ToolboxGroupService,
        private checklistService: ChecklistService) { }

    getAreaChecks(): Observable<IChecklistArea> {
        let checklistArea: IChecklistArea;
        return this.checklistService.currentChecklistArea$.pipe(
            take(1),
            tap(data => checklistArea = data),
            tap(data => console.log('currentChecklistArea$ 1 = ', data)),
            switchMap(data => this.checklistReadApiService.getAreaChecks(data)),
            map(data => this.toolbox.sorting(data, 'levelRank')),
            tap(data => checklistArea.areaChecks = data),
            map(() => checklistArea),
            tap(() => console.log('currentChecklistArea$ 2 = ', checklistArea)),
        );
    }

}
