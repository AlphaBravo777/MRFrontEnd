import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';


// import { Field, FieldConfig } from './fieldconfig.interface';
import { FormButtonComponent } from '../dynamic-form-controls/form-button/form-button.component';
import { FormInputComponent } from '../dynamic-form-controls/form-input/form-input.component';
import { FormSelectComponent } from '../dynamic-form-controls/form-select/form-select.component';
import { IFormField, IFormControlBuilder } from './dynamic-form.interface';
import { FormFilterInputComponent } from '../dynamic-form-controls/form-filter-input/form-filter-input.component';

const components: { [type: string]: Type<IFormField> } = {
    button: FormButtonComponent,
    input: FormInputComponent,
    select: FormSelectComponent,
    filterInput: FormFilterInputComponent
};

@Directive({
    selector: '[libDynamicField]'
})
export class DynamicFieldDirective implements OnChanges, OnInit{

    @Input() config: IFormControlBuilder;
    @Input() group: FormGroup;
    // @Input() data1: any;

    component: ComponentRef<IFormField>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) { }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }

    ngOnInit() {
        if (!components[this.config.control]) {
            const supportedTypes = Object.keys(components).join(', ');
            throw new Error(
                `Trying to use an unsupported type (${this.config.control}).
                 Supported types: ${supportedTypes}`
            );
        }
        const component = this.resolver.resolveComponentFactory<IFormField>(components[this.config.control]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    }
}
