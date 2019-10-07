import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { InsertProductViewComponent } from './insert-product-view.component';
import { ReactiveFormsModule, FormBuilder, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
import { ColorChangeInputBoxComponent } from 'src/app/home/shared/components/color-change-input-box/color-change-input-box.component';
import { MinimalisticButtonComponent } from 'src/app/home/shared/components/minimalistic-button/minimalistic-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

const formBuilder: FormBuilder = new FormBuilder();

describe('InsertProductViewComponent', () => {
    let component: InsertProductViewComponent;
    let fixture: ComponentFixture<InsertProductViewComponent>;
    // this.controller = this.fgd.control.get(this.controlPath) as FormArray;  "orders"

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InsertProductViewComponent,
                ColorChangeInputBoxComponent,
                MinimalisticButtonComponent
            ],
            imports: [ReactiveFormsModule, HttpClientTestingModule, ApolloTestingModule ],
            providers: [ FormGroupDirective, { provide: FormBuilder, useValue: formBuilder } ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InsertProductViewComponent);
        component = fixture.componentInstance;
        const controlPathInput = '["orders"]';
        component.controlPath = controlPathInput;
        console.log('Controlpath = ', component.controlPath);
        const ordersControl = new FormControl('old value');
        // component.control = [];
        // fixture.detectChanges(); // This causes an error for some reason
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
