import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import { Subscription, fromEvent } from 'rxjs';
import { map, debounceTime, tap } from 'rxjs/operators';

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
    @Output() userInput: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('searchBox', {static: true}) searchBox: ElementRef;
    @ViewChild('floatInput', {static: true}) floatInput: ElementRef;
    subscription: Subscription;
    controller: FormControl;

    ngOnInit() {
        this.controller = this.fgd.control.get(
          this.controlPath
        ) as FormControl;
        this.subscription = fromEvent(this.searchBox.nativeElement, 'keyup').pipe(
            map((k: any) => k.target.value),
            debounceTime(500),
            tap((data) => this.userInput.emit(data)),
        ).subscribe();
    }

    inputSelected() {
        setTimeout(() => this.floatInput.nativeElement.focus(), 0);
    }

}
