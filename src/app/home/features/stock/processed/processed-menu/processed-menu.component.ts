import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-processed-menu',
    templateUrl: './processed-menu.component.html',
    styleUrls: ['./processed-menu.component.css']
})
export class ProcessedMenuComponent implements OnInit {

    constructor() { }

    @Input() processedStockMain;
    @Input() hasBackdrop: true;
    @Input() overlapTrigger: true;


    ngOnInit() {
    }

}
