import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-float-label-input-box',
    templateUrl: './float-label-input-box.component.html',
    styleUrls: ['./float-label-input-box.component.scss']
})
export class FloatLabelInputBoxComponent implements OnInit {

    constructor(private fgd: FormGroupDirective) { }

    @Input() placeHolderText: string;
    @Input() inputFormControl: FormControl;
    @Input() caption: string;
    @Input() controlPath: any;
    control: FormControl;

    ngOnInit() {
        this.control = this.fgd.control.get(
          this.controlPath
        ) as FormControl;
    }

}
