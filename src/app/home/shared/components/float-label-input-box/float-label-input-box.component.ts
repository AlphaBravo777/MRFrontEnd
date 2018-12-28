import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-float-label-input-box',
    templateUrl: './float-label-input-box.component.html',
    styleUrls: ['./float-label-input-box.component.scss']
})
export class FloatLabelInputBoxComponent implements OnInit {

    constructor() { }

    @Input() placeHolderText: string;
    @Input() formControl: AbstractControl;
    @Input() caption: string;

    ngOnInit() {
    }

}
