import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-change-test-view1',
    templateUrl: './change-test-view1.component.html',
    styleUrls: ['./change-test-view1.component.scss']
})
export class ChangeTestView1Component implements OnInit {

    @Input() data1;

    constructor() { }

    ngOnInit() {
    }

}
