import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToolboxGroupService } from '../../services/toolbox/toolbox-group.service';

export class IFilterInputStructure {
    id: number;
    value: string;
}

@Component({
    selector: 'app-filter-input',
    templateUrl: './filter-input.component.html',
    styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent implements OnInit {

    @Input() fullData: IFilterInputStructure[];
    @Input() nameField: string;
    @Input() idField: string;
    @Input() valueInput: string;
    @Input() placeholder: string;
    @Input() label: string;
    @Output() value: EventEmitter<IFilterInputStructure> = new EventEmitter<IFilterInputStructure>();
    private filteredData: IFilterInputStructure[] = [];

    private  inputField: FormControl = new FormControl('');

    constructor(private toolbox: ToolboxGroupService) { }

    ngOnInit() {
        this.inputField.setValue(this.valueInput);
    }

    private searchData() {
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
        const result = this.toolbox.searchWordsInPhrase('Alpha Bravo Charlie', listOfSearchTerms);
    }

    private valuePicked(value: IFilterInputStructure) {
        this.value.emit(value);
        this.filteredData = [];
        this.inputField.setValue(value[this.nameField]);
    }

}
