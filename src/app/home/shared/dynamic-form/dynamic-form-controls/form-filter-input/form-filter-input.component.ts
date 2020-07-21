import { Component, OnInit, OnDestroy } from '@angular/core';
import { IFormField, IFormControlBuilder } from '../../dynamic-form-services/dynamic-form.interface';
import { FormGroup } from '@angular/forms';
import { DynamicFormData$Service } from '../../dynamic-form-services/dynamic-form-data$.service';
import { Subscription } from 'rxjs';
import { take, tap, concatMap } from 'rxjs/operators';

@Component({
    selector: 'lib-form-filter-input',
    templateUrl: './form-filter-input.component.html',
    styleUrls: ['./form-filter-input.component.scss']
})
export class FormFilterInputComponent implements OnInit, IFormField, OnDestroy {

    // This component looks for its input data under the same name as its formControlName in the data store.
    // The reason is because you can not give the data in via database for the form, since the data usually comes from some other tables.
    // So you fetch the data and load it into the store before loading this form

    constructor(private dynamicFormData$Service: DynamicFormData$Service) { }

    config: IFormControlBuilder;
    group: FormGroup;
    subscription: Subscription;
    searchData: any[];
    filteredSearchData: any[] = [];

    // At some point you would have to insert standarized data here, maybe just a name and a id, so that you can reuse it.
    // At the moment in the template we have {{result.categoryName}, which should just be result.name

    ngOnInit(): void {
        console.log('Fitler input forms data = ', this.group);
        this.subscription = this.dynamicFormData$Service.currentFilterInputData$.pipe(
            // take(1),
            // tap(data => console.log('Correct data = ', data[this.config.formControlName]))
            tap(data => this.searchData = data[this.config.formControlName]),
            concatMap(() => this.group.valueChanges),
            tap(newInputValue => this.filterDataBasedOnInput(newInputValue.inputFilterCategoryName))
        ).subscribe();
    }

    filterDataBasedOnInput(inputValue: string) {
        this.filteredSearchData = [];
        for (const result of this.searchData) {
            if (result.categoryName.toLowerCase().includes(inputValue.toLowerCase()) && inputValue !== '') {
                this.filteredSearchData.push(result);
            }
        }
        if (this.filteredSearchData.length > 0) {
            this.group.get([this.config.formControlName]).setErrors({notUnique: true});
        }
        // console.log('Errors - ', this.group.get([this.config.formControlName]).status);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
