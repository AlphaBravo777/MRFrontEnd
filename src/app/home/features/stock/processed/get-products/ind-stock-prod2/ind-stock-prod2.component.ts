import { Component, OnInit, Input, OnChanges, SimpleChanges, Directive, Renderer2, ElementRef } from '@angular/core';
import { ProcessedStockFormService } from '../../../stock-services/processed-stock-form.service';
import { FormGroup, FormBuilder, FormArray } from '../../../../../../../../node_modules/@angular/forms';
import { IProcessedStockContainer, IProcessedStockProducts } from '../../../stock-services/Stock';


@Component({
    selector: 'app-ind-stock-prod2',
    templateUrl: './ind-stock-prod2.component.html',
    styleUrls: ['./ind-stock-prod2.component.css']
})
export class IndStockProd2Component implements OnInit, OnChanges {

    constructor(private processedStockFormService: ProcessedStockFormService, private fb: FormBuilder) { }

    @Input() productName: IProcessedStockProducts;
    @Input() containers;
    @Input() prodDescription;
    @Input() stocktime;
    amountForm: FormGroup;

    ngOnInit() {
        console.log(this.productName);
        this.buildForm();
    }

    buildForm() {
        this.amountForm = this.fb.group({
            mainContainer: this.fb.array([])
        });
        this.setCompanies();
    }

    setCompanies() {
        const control = <FormArray>this.amountForm.controls.mainContainer;
        this.productName.mainContainer.forEach(x => {
            control.push(this.fb.group({
                container: x.container,
                amount: this.setProjects(x)
            }));
        });
    }

    setProjects(x: IProcessedStockContainer) {
        const arr = new FormArray([]);
        x.amount.forEach(y => {
            arr.push(this.fb.group({
                amount: y
            }));
        });
        return arr;
    }

    deleteProject(control, index) {
        control.removeAt(index);
        this.amountFormSubmit();
    }

    addNewProject(control) {
        control.push(
            this.fb.group({
                amount: ['']
            }));
    }

    amountFormSubmit() {
        console.log(this.productName.product, this.amountForm.value);
        this.processedStockFormService.turnIntoProductUnit(this.productName.product, this.amountForm.value);
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes['productName']) {
            this.buildForm();
            // console.log(this.productName);
            // this.buildAmountForm(this.productName);
        }
    }
}
