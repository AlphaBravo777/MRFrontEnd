import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
    Validator, Validators, AbstractControl, ValidationErrors
} from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@ng-stack/forms';
import { IItemGroup } from 'projects/product-service/src/lib/#shared-services/interfaces/item.interface';
import { IDepartment, ICategory, IGroup } from 'projects/product-service/src/lib/#shared-services/interfaces/auxiliary';

@Component({
  selector: 'mr-product-product-form-groups',
  templateUrl: './product-form-groups.component.html',
  styleUrls: ['./product-form-groups.component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => ProductFormGroupsComponent),
          multi: true
      },
      {
          provide: NG_VALIDATORS,
          useExisting: forwardRef(() => ProductFormGroupsComponent),
          multi: true
      }
  ]
})
export class ProductFormGroupsComponent implements OnInit, ControlValueAccessor, Validator {

    @Input() departmentGroupings: IDepartment[];
    departmentGroupingsArray: Array<IDepartment[]> = [];
    categories: Array<ICategory[]> = [];
    groups: Array<IGroup[]> = [];


    public itemGroupWithID: FormArray<IItemGroup> = new FormArray<IItemGroup>([]);

        constructor() { }

        ngOnInit() {
            this.departmentGroupingsArray.push(this.departmentGroupings);
            this.itemGroupWithID.push(this.createCodeDetail());
            console.log('departmentGroupingsArray = ', this.departmentGroupingsArray, this.departmentGroupings);
        }

        createDepartment(): FormGroup<IDepartment> {
            return new FormGroup<IDepartment>({
                departmentid: new FormControl(null, [Validators.required]),
                name: new FormControl('', [Validators.required]),
                rankingInDepartment: new FormControl(null),
                categories: new FormArray([])
            });
        }

        createCategory(): FormGroup<ICategory> {
            return new FormGroup<ICategory>({
                categoryid: new FormControl(null, [Validators.required]),
                name: new FormControl('', [Validators.required]),
                rankingInCategory: new FormControl(null),
                groups: new FormArray([])
            });
        }

        createGroup(): FormGroup<IGroup> {
            return new FormGroup<IGroup>({
                groupid: new FormControl(null, [Validators.required]),
                name: new FormControl('', [Validators.required]),
                rankingInGroup: new FormControl(null),
            });
        }

        createCodeDetail(): FormGroup<IItemGroup> {
            const itemGroup: FormGroup<IItemGroup> = new FormGroup<IItemGroup>(
                {
                    itemCode: new FormControl(''),
                    departmentData: this.createDepartment(),
                    categoryData: this.createCategory(),
                    groupData: this.createGroup(),
                    rankInGroup: new FormControl(null),
                });
            return itemGroup;
        }

        public onTouched: () => void = () => { };

        writeValue(val: any): void {
            return val && this.itemGroupWithID.setValue(val, { emitEvent: false });
        }

        registerOnChange(fn: any): void {
            this.itemGroupWithID.valueChanges.subscribe(fn);
        }

        registerOnTouched(fn: any): void {
            this.onTouched = fn;
        }

        setDisabledState?(isDisabled: boolean): void {
            isDisabled ? this.itemGroupWithID.disable() : this.itemGroupWithID.enable();
        }

        validate(c: AbstractControl): ValidationErrors | null {
            return this.itemGroupWithID.valid ? null : { invalidForm: { valid: false, message: 'itemGroupWithID fields are invalid' } };
        }

        addDepartment() {
            this.itemGroupWithID.push(this.createCodeDetail());
            this.departmentGroupingsArray.push(this.departmentGroupings);
        }

        deleteDepartment(index: number) {
            const groups = <FormArray>this.itemGroupWithID;
            groups.removeAt(index);
        }

        departmentSelection(department: IDepartment, formIndex: number) {
            // Reset category selection
            this.categorySelection({name: '', categoryid: null, rankingInCategory: null, groups: []}, formIndex);

            const departmentControl = <FormGroup>this.itemGroupWithID.controls[formIndex].get('departmentData');
            departmentControl.get('name').setValue(department.name);
            this.categories[formIndex] = department.categories;
        }

        categorySelection(category: ICategory, formIndex: number) {
            // Reset group selection
            this.groupSelection({name: '', groupid: null, rankingInGroup: null}, formIndex);

            const categoryControl = <FormGroup>this.itemGroupWithID.controls[formIndex].get('categoryData');
            categoryControl.get('name').setValue(category.name);
            categoryControl.get('categoryid').setValue(category.categoryid);
            if (category.categoryid) {
                this.groups[formIndex] = category.groups;
                console.log('Groups = ', this.groups);
            }
        }

        groupSelection(group: IGroup, formIndex: number) {
            const groupControl = <FormGroup>this.itemGroupWithID.controls[formIndex].get('groupData');
            groupControl.get('name').setValue(group.name);
            groupControl.get('groupid').setValue(group.groupid);
        }
    }
