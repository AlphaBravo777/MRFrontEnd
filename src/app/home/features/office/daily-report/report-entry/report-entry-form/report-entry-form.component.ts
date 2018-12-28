import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportEntryService } from '../report-entry-services/report-entry.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-report-entry-form',
    templateUrl: './report-entry-form.component.html',
    styleUrls: ['./report-entry-form.component.scss']
})
export class ReportEntryFormComponent implements OnInit, OnDestroy {

    @Input() messageLevel;
    @Input() textboxPlaceHolder;
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
            message: ['', Validators.required],
        });
    }

    submitEntry() {
        const newReport = { message: this.dailyReportEntryForm.controls.message.value, messageLevel: this.messageLevel.name };
        console.log('The form submit entry function is running now');
        this.subscription = this.reportEntryService.enterNewReport(newReport).subscribe();
        this.createForm();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
