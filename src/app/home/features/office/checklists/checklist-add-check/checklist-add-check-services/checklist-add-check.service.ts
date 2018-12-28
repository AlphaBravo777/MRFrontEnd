import { Injectable } from '@angular/core';
import { ChecklistAddCheckApiService } from './checklist-add-check-api.service';
import { Observable } from 'rxjs';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { IChecklistLevels, IChecklistArea } from '../../checklist-services/checklist-interface';
import { ChecklistReadService } from '../../checklist-read/checklist-read-services/checklist-read.service';
import { ChecklistService } from '../../checklist-services/checklist.service';

@Injectable({
    providedIn: 'root'
})
export class ChecklistAddCheckService {

    constructor(
        private checklistAddCheckApiService: ChecklistAddCheckApiService,
        private getDateService: GetDate$Service,
        private checklistReadService: ChecklistReadService,
        private checklistService: ChecklistService) { }

    getChecklistLevels(): Observable<IChecklistLevels[]> {
        return this.checklistAddCheckApiService.getChecklistLevels().pipe();
    }

    getChecklistArea(): Observable<IChecklistArea> {
        return this.checklistService.currentChecklistArea$.pipe();
    }

    enterNewReport(newChecklistEntry): Observable<any> {
        return this.getDateService.currentDatePackage$.pipe(
            take(1),  // Take one so that it does not post everytime the date changes
            map(data => newChecklistEntry['timestampID'] = data.id),
            tap(() => console.log('newChecklistEntry with timeStampID = ', newChecklistEntry)),
            switchMap(() => this.checklistAddCheckApiService.enterNewChecklist(newChecklistEntry)),
            switchMap(() => this.checklistReadService.getAreaChecks())
        );
    }
}
