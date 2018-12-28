import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChecklistAddCheckService } from '../checklist-add-check-services/checklist-add-check.service';
import { IChecklistLevels, IChecklistArea } from '../../checklist-services/checklist-interface';

@Component({
    selector: 'app-checklist-add-check-form',
    templateUrl: './checklist-add-check-form.component.html',
    styleUrls: ['./checklist-add-check-form.component.scss']
})
export class ChecklistAddCheckFormComponent implements OnInit, OnDestroy {

    @Input() messageLevel: IChecklistLevels;
    @Input() areaData: IChecklistArea;
    checklistEntryForm: FormGroup;
    subscription: Subscription;

    constructor(private fb: FormBuilder, private checklistAddCheckService: ChecklistAddCheckService) { }

    ngOnInit() {
        console.log('Form = ', this.areaData);
        this.createForm();
    }

    createForm() {
        this.checklistEntryForm = this.fb.group({
            message: ['', Validators.required],
            areaName: [this.areaData.name],
            areaid: [this.areaData.areaid]
        });
    }

    submitEntry() {
        const newChecklist = {
            message: this.checklistEntryForm.controls.message.value,
            messageArea: this.checklistEntryForm.controls.areaName.value,
            areaid: this.checklistEntryForm.controls.areaid.value,
            messageLevel: this.messageLevel.name };
        console.log('The form submit entry function is running now', newChecklist);
        this.subscription = this.checklistAddCheckService.enterNewReport(newChecklist).subscribe();
        this.createForm();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
