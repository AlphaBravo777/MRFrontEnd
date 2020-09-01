import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChecklistReadService } from '../checklist-read-services/checklist-read.service';
import { Subscription } from 'rxjs';
import { IChecksSingleArea, IChecklistArea } from '../../checklist-services/checklist-interface';
import { ChecklistService } from '../../checklist-services/checklist.service';

@Component({
    selector: 'app-checklist-read-data',
    templateUrl: './checklist-read-data.component.html',
    styleUrls: ['./checklist-read-data.component.scss']
})
export class ChecklistReadDataComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    singleAreaChecks: IChecklistArea;

    constructor(private checklistReadService: ChecklistReadService, private checklistService: ChecklistService) { }

    ngOnInit() {
        this.getAreaChecks();
    }

    // areaData was here, but it got it wrongly, so it must get it back form the service, and give the data
    // through to the other views with the correct data

    getAreaChecks() {
        this.subscription = this.checklistReadService.getAreaChecks().subscribe(data => {
            this.singleAreaChecks = data;
            console.log('Checklist read data components:', this.singleAreaChecks);
            });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
