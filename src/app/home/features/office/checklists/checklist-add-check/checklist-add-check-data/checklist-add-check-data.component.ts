import { Component, OnInit, Input } from '@angular/core';
import { ChecklistAddCheckService } from '../checklist-add-check-services/checklist-add-check.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { IChecklistArea, IChecklistPackage, IChecklistLevels } from '../../checklist-services/checklist-interface';

@Component({
    selector: 'app-checklist-add-check-data',
    templateUrl: './checklist-add-check-data.component.html',
    styleUrls: ['./checklist-add-check-data.component.scss']
})
export class ChecklistAddCheckDataComponent implements OnInit {

    checklistLevels: IChecklistLevels[];
    areaData: IChecklistArea;

    constructor(private checklistAddCheckService: ChecklistAddCheckService) { }

    ngOnInit() {
        this.getChecklistLevelsAndAreas();

    }

    getChecklistLevelsAndAreas() {
        this.checklistAddCheckService.getChecklistLevels().pipe(
            map(data => this.checklistLevels = data),
            switchMap(() => this.checklistAddCheckService.getChecklistArea()),
            map(data => this.areaData = data),
            // tap(() => console.log(this.checklistLevels)),
        ).subscribe();
    }

}
