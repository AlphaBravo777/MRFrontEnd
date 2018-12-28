import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-report-entry-view1',
    templateUrl: './report-entry-view1.component.html',
    styleUrls: ['./report-entry-view1.component.scss']
})
export class ReportEntryView1Component implements OnInit {

    showEntryBox = false;

    constructor() { }

    @Input() messageFlags;
    messageLevel = {name: 'standard', color: '#c0c0c0'};

    ngOnInit() {
    }

    buttonPicked(button) {
        this.messageLevel = button;
    }

    showEntry() {
        this.showEntryBox = !this.showEntryBox;
    }

}
