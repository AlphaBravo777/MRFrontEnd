import {
    Component, OnInit, Input, Output,
    EventEmitter, ViewChildren,
    QueryList, ElementRef, AfterContentChecked, Renderer
} from '@angular/core';
import { IReadReportPackage } from '../report-read-services/read-report-interface';

@Component({
    selector: 'app-report-read-view1',
    templateUrl: './report-read-view1.component.html',
    styleUrls: ['./report-read-view1.component.scss']
})
export class ReportReadView1Component implements OnInit, AfterContentChecked {

    @Input() messagePackage: IReadReportPackage;
    @Output() reportid: EventEmitter<any> = new EventEmitter<any>();

    testMessage = {
        color: '#000000',
        message: 'This is a test message, and should read like a normal message, except this is a test message',
        messageID: 'RGFpbHlSZXBvcnRUeXBlOjExNQ==',
        rowid: 115,
        userID: 'VXNlclR5cGU6MTU=',
        userName: 'Admin',
        userid: 15,
    };

    constructor() { }

    ngOnInit() {
    }

    deleteReport(reportid) {
        this.reportid.emit(reportid);
    }

    ngAfterContentChecked(): void {
        // this.getTemplateUserNameWidths();
    }

    // getTemplateUserNameWidths() {
    //     if (this.title) {
    //         // console.log('title:', this.title);
    //         const largestWidth = this.title.reduce((height, bookRef) => {
    //             const rect = bookRef.nativeElement.getBoundingClientRect();
    //             return rect.width > height ? rect.width : height;
    //         }, 0);
    //         // console.log('Largest width = ', largestWidth);
    //         this.setUsernameWidths(largestWidth);
    //     }
    // }

    // setUsernameWidths(width) {
    //     if (width < 100) {  // TODO: Weird bug that increases width eveytime you tap calender, or on screen
    //         this.title.map(data => this.renderer.setElementStyle(data.nativeElement, 'width', width + 5 + 'px'));
    //     }
    // }


}
