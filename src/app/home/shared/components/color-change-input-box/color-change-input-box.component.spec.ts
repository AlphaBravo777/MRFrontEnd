import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorChangeInputBoxComponent } from './color-change-input-box.component';
import { ReactiveFormsModule, FormGroupDirective, FormBuilder } from '@angular/forms';

const formBuilder: FormBuilder = new FormBuilder();

describe('ColorChangeInputBoxComponent', () => {
    let component: ColorChangeInputBoxComponent;
    let fixture: ComponentFixture<ColorChangeInputBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [ColorChangeInputBoxComponent],
            providers: [
                FormGroupDirective,
                { provide: FormBuilder, useValue: formBuilder }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorChangeInputBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
