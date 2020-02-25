import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToolboxGroupService } from '../../services/toolbox/toolbox-group.service';

@Component({
    selector: 'app-filter-input',
    templateUrl: './filter-input.component.html',
    styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent implements OnInit {

    @Input() fullData: [];
    @Input() nameField: string;
    @Input() idField: string;
    @Input() valueInput: string;
    @Input() placeholder: string;
    @Input() label: string;
    @Output() value: EventEmitter<any> = new EventEmitter<any>();
    @Output() selectedValue: EventEmitter<any> = new EventEmitter<any>();
    filteredData: any[] = [];

    inputField: FormControl = new FormControl('');

    constructor(private toolbox: ToolboxGroupService) { }

    ngOnInit() {
        this.inputField.setValue(this.valueInput);
    }

    searchData() {
        const value = this.inputField.value;
        this.filteredData = [];
        const listOfSearchTerms = value.trim().split(' ');
        for (let index = 0; index < this.fullData.length; index++) {
            const element = this.fullData[index];
            if (this.filteredData.length <= 10 && value.length > 0) {
                if (this.toolbox.searchWordsInPhrase(element[this.nameField], listOfSearchTerms)) {
                    this.filteredData.push(element);
                }
            }
        }
    }

    valueSelected(value) {
        this.selectedValue.emit(value);
        this.filteredData = [];
        this.inputField.setValue(value[this.nameField]);
    }

    currentValue() {
        const value = this.inputField.value;
        const emitVal = {[this.nameField]: value, [this.idField]: null};
        this.value.emit(emitVal);
    }

}
