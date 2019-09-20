import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ViewChild, ElementRef } from '@angular/core';
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
    @Input() capitalize: boolean;
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('userInput', {static: true}) userInput: ElementRef;

    controller: FormControl;

    constructor(private fgd: FormGroupDirective, private renderer: Renderer2) {}

    ngOnInit() {
        this.controller = this.fgd.control.get(
            this.controlPath
        ) as FormControl;
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

    valueChanged(value: string) {
        if (this.capitalize && value) {
            this.renderer.setProperty(this.userInput.nativeElement, 'value', value.toUpperCase());
        }
        this.valueChange.emit(value);
    }

}
