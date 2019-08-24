import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICustomRadioButton } from './radio-button-interface';

@Component({
    selector: 'app-custom-radio-group',
    templateUrl: './custom-radio-group.component.html',
    styleUrls: ['./custom-radio-group.component.scss']
})

export class CustomRadioGroupComponent implements OnInit {

    @Input() buttons: ICustomRadioButton[];
    @Input() defaultButton: ICustomRadioButton;
    @Output() buttonPicked: EventEmitter<any> = new EventEmitter<any>();
    radioButtons: ICustomRadioButton[] = [];

    constructor() { }

    ngOnInit() {
        this.buttons.map((object, index) => {
            const tempObject: ICustomRadioButton = {name: null};
            Object.keys(object).map(prop => {
                if (prop.includes('Name') || prop.includes('name')) {
                    tempObject.name = object[prop];
                } else if (prop.includes('Color') || prop.includes('color')) {
                    tempObject.color = object[prop];
                } else if (prop.includes('Rank') || prop.includes('rank')) {
                    tempObject.rank = object[prop];
                } else if (prop.includes('buttonid')) {
                    tempObject.buttonid = object[prop];
                } else if (prop.includes('description')) {
                    tempObject.description = object[prop];
                } else {
                    console.log(' # # # # # # The radio button properties do not match up correctly # # # # # #');
                }
            });
            this.radioButtons.push(tempObject);
        });
    }

    public buttonPick(filter: ICustomRadioButton): void {
        this.buttons.map(object => {
            Object.keys(object).map(prop => {
                if (prop.includes('Name') || prop.includes('name')) {
                    if (object[prop] === filter.name) {
                        this.buttonPicked.emit(object);
                        return;
                    }
                }
            });
            // this.buttonPicked.emit(filter);
        });
    }

}
