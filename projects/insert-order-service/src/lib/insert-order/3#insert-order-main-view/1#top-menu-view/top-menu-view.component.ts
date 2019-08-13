import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'mr-insert-top-menu-view',
    templateUrl: './top-menu-view.component.html',
    styleUrls: ['./top-menu-view.component.scss']
})
export class TopMenuViewComponent implements OnInit {

    @Input() mainInsertForm: FormGroup;

    constructor() {}

    ngOnInit() {}

    deleteOrder() {
        console.log('Delete button clicked');
    }
}
