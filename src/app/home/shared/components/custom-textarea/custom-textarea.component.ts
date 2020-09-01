import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-custom-textarea',
    templateUrl: './custom-textarea.component.html',
    styleUrls: ['./custom-textarea.component.scss']
})
export class CustomTextareaComponent implements OnInit {

    constructor() { }

    @Input() inputFormGroup: FormGroup;
    @Input() placeHolderText: string;
    @Input() controlName;
    @Input() caption: string;
    @Input() colorInput;

    ngOnInit() {
    }

}
