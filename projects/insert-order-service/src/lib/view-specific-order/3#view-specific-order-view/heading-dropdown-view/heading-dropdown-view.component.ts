import { Component, OnInit } from '@angular/core';
import { GetDate$Service } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/get-date$.service';

@Component({
    selector: 'mr-insert-heading-dropdown-view',
    templateUrl: './heading-dropdown-view.component.html',
    styleUrls: ['./heading-dropdown-view.component.scss']
})
export class HeadingDropdownViewComponent implements OnInit {

    constructor(private getDate$Service: GetDate$Service) {}

    ngOnInit() {}

    getLongDate(date: Date) {
        date = new Date(date.valueOf() + (120 * 60000));
        // this.getDate$Service.inputLongDate(date).subscribe();
        console.log(date);
    }
}
