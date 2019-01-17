import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportEntryService } from '../report-entry-services/report-entry.service';
import { Subscription } from 'rxjs';
import { IReadReportLevels, INewMessagePackage } from '../../report-read/report-read-services/read-report-interface';
import { IInsertNewReportApiInterface } from '../report-entry-services/report-entry-interface';

@Component({
    selector: 'app-report-entry-form',
    templateUrl: './report-entry-form.component.html',
    styleUrls: ['./report-entry-form.component.scss']
})
export class ReportEntryFormComponent implements OnInit, OnDestroy, OnChanges {

    @Input() newMessagePackage: INewMessagePackage;
    @Input() currentMessageLevel: IReadReportLevels;
    dailyReportEntryForm: FormGroup;
    subscription: Subscription;

    constructor(private fb: FormBuilder,
        private reportEntryService: ReportEntryService,
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.dailyReportEntryForm = this.fb.group({
            message: [this.newMessagePackage.message, Validators.required],
            messageLevel: [this.newMessagePackage.currentFlag],
            messageid: [this.newMessagePackage.messageid],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('Delta - I am running with changes', changes);
        if (this.dailyReportEntryForm) {
            console.log('Delta - I am running with changes', changes);
            this.dailyReportEntryForm.get('messageLevel').setValue(changes.currentMessageLevel.currentValue);
        }
    }

    submitOrEditEntry(messageType) {
        if (messageType === 'New') {
            console.log('Here is the new message form: ', this.dailyReportEntryForm.value);
            this.reportEntryService.enterNewReport(this.dailyReportEntryForm.value);
            this.createForm();
        }
        if (messageType === 'Edit') {
            console.log('The message will now be edited', this.dailyReportEntryForm.value);
            this.reportEntryService.updateReport(this.dailyReportEntryForm.value).subscribe();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
