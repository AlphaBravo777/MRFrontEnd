import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProcessedStockFormService } from '../../../stock-services/processed-stock-form.service';
import { FormGroup, FormBuilder, FormArray } from '../../../../../../../../node_modules/@angular/forms';
import { ProcessedStockContainer, ProcessedStockProducts } from '../../../stock-services/Stock';

@Component({
    selector: 'app-ind-stock-prod2',
    templateUrl: './ind-stock-prod2.component.html',
    styleUrls: ['./ind-stock-prod2.component.css']
})
export class IndStockProd2Component implements OnInit, OnChanges {

    constructor(private psf: ProcessedStockFormService, private fb: FormBuilder) { }

    @Input() productName: ProcessedStockProducts;
    @Input() containers;
    amountForm: FormGroup;

    ngOnInit() {
        console.log('1234', this.productName);
        // this.form = this.psf.toFormGroup(this.productName);
        // this.buildAmountForm(this.productName);
        this.buildForm();
    }

    buildForm() {
        this.amountForm = this.fb.group({
            companies: this.fb.array([])
        });
        this.setCompanies();
    }

    setCompanies() {
        const control = <FormArray>this.amountForm.controls.companies;
        this.productName.mainContainer.forEach(x => {
            control.push(this.fb.group({
                company: x.container,
                projects: this.setProjects(x)
            }));
        });
    }

    setProjects(x: ProcessedStockContainer) {
        const arr = new FormArray([]);
        x.amount.forEach(y => {
            arr.push(this.fb.group({
                projectName: y
            }));
        });
        return arr;
    }

    deleteProject(control, index) {
        control.removeAt(index);
    }

    addNewProject(control) {
        control.push(
            this.fb.group({
                projectName: ['']
            }));
    }











    // --------------------------------------------------------------------------

    // buildAmountForm(amounts: ProcessedStockProducts) {
    //     const formArray = [];
    //     for (let i = 0; i < amounts.mainContainer.length; ++i) {
    //         formArray[i] = this.fb.group({
    //             container : this.fb.control(amounts.mainContainer[i].container),
    //             amount : this.fb.array(amounts.mainContainer[i].amount),
    //         });
    //     }
    //     this.amountForm = this.fb.group({
    //         productArray: this.fb.array(formArray)
    //     });
    //     console.log('------' , this.amountForm);
    // }


    // buildAmountForm(amounts: ProcessedStockProducts) {
    //     const formArray = [];
    //     for (let i = 0; i < amounts.mainContainer.length; ++i) {
    //         formArray[i] = this.fb.group({
    //             container : this.fb.control(amounts.mainContainer[i].container),
    //             amount : this.fb.array(amounts.mainContainer[i].amount),
    //         });
    //     }
    //     this.amountForm = this.fb.array(formArray);
    //     console.log(this.amountForm);
    // }

    // data.mainContainer.forEach(x => {
    //     let i = 0;
    //     group[x.container] = this.fb.group({
    //             productName: this.fb.control(data.mainContainer[i].container),
    //             amounts: this.fb.array(data.mainContainer[i].amount),
    //             });
    //     i = i + 1;
    //   });

    // { "container": "Crate", "name": [ "6", "7", "8 * 9" ] }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['productName']) {
            this.buildForm();
            console.log(this.productName);
            // this.buildAmountForm(this.productName);
        }
    }
}
