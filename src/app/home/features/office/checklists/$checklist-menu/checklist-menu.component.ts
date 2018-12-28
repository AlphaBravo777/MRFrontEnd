import { Component, OnInit } from '@angular/core';
import { ChecklistApiService } from '../checklist-services/checklist-api.service';
import { IChecklistArea } from '../checklist-services/checklist-interface';
import { ChecklistService } from '../checklist-services/checklist.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checklist-menu',
    templateUrl: './checklist-menu.component.html',
    styleUrls: ['./checklist-menu.component.scss']
})
export class ChecklistMenuComponent implements OnInit {

    checklistAreas: IChecklistArea[];

    constructor(
        private checklistApiService: ChecklistApiService,
        private checklistService: ChecklistService,
        private router: Router) { }



    ngOnInit() {
        this.checklistApiService.getChecklistAreas().subscribe(
            data => this.checklistAreas = data
        );
    }

    areaSelected(area: IChecklistArea) {
        this.checklistService.setChecklistArea(area);
        console.log('router URL:', this.router.url);
        this.router.navigate(['../main/admin-office/checklists/area-checks']);
    }

}
