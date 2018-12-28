import { Component, OnInit, Input } from '@angular/core';
import { IChecklistArea, IChecklistPackage, IChecklistLevels } from '../../checklist-services/checklist-interface';


@Component({
    selector: 'app-checklist-add-check-view1',
    templateUrl: './checklist-add-check-view1.component.html',
    styleUrls: ['./checklist-add-check-view1.component.scss']
})
export class ChecklistAddCheckView1Component implements OnInit {

    @Input() checklistLevels: IChecklistLevels[];
    messageLevel: IChecklistLevels = {name: 'standard', levelColor: '#000', levelRank: 1};
    @Input() areaData: IChecklistArea;
    // @Input() areaData;

    constructor() { }

    ngOnInit() {
        console.log('View1 =', this.areaData, this.checklistLevels);
    }

    checklistAreaPicked(areaPicked) {
        this.areaData = areaPicked;
        console.log(areaPicked);
    }

    checklistLevelPicked(levelPicked) {
        this.messageLevel = levelPicked;
        console.log(levelPicked);
    }

}
