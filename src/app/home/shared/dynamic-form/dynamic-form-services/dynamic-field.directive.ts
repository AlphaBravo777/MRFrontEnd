import { Directive, Input, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormButtonComponent } from '../controls/form-button/form-button.component';
import { FormInputComponent } from '../controls/form-input/form-input.component';
import { FormSelectComponent } from '../controls/form-select/form-select.component';
import { FormFilterInputComponent } from '../controls/form-filter-input/form-filter-input.component';

const components = {
    button: FormButtonComponent,
    input: FormInputComponent,
    select: FormSelectComponent,
    filterInput: FormFilterInputComponent,
};

@Directive({
    selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {

    @Input() config;
    @Input() group: FormGroup;
    component;

    constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }

    ngOnInit() {
        const component = components[this.config.type];
        const factory = this.resolver.resolveComponentFactory<any>(component);
        this.component = this.container.createComponent(factory);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    }
}
