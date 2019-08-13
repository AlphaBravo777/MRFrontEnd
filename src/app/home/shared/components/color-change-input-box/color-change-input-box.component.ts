import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, FormArray } from '@angular/forms';
import { IColorChangeInputBoxInterface } from '../shared-components-interface';

@Component({
    selector: 'app-color-change-input-box',
    templateUrl: './color-change-input-box.component.html',
    styleUrls: ['./color-change-input-box.component.scss']
})
export class ColorChangeInputBoxComponent implements OnInit {

    @Input() colorChangeInputBoxData: IColorChangeInputBoxInterface;
    @Input() defaultValue: string;
    @Input() inputBoxFormControl: FormArray;
    @Input() controlPath: string;
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
    controller: FormControl;

    constructor(private fgd: FormGroupDirective) {}

    ngOnInit() {
        this.controller = this.fgd.control.get(
            this.controlPath
        ) as FormControl;
        // console.log('* The product form control = ', this.controller, this.controlPath);
    }

    getInputBoxStyle(): Object {
        return this.colorChangeInputBoxData.inputBoxStyle;
    }

    getInputBoxClass(): string {
        if (this.controller.invalid) {
            return 'red';
        } else {
            return 'green';
        }
    }

}
