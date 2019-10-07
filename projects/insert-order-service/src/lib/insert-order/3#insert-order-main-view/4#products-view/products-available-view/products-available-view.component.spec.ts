import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAvailableViewComponent } from './products-available-view.component';
import { MinimalisticButtonComponent } from 'src/app/home/shared/components/minimalistic-button/minimalistic-button.component';
import { ReactiveFormsModule, FormArray } from '@angular/forms';

describe('ProductsAvailableViewComponent', () => {
    let component: ProductsAvailableViewComponent;
    let fixture: ComponentFixture<ProductsAvailableViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProductsAvailableViewComponent,
                MinimalisticButtonComponent
            ],
            imports: [ReactiveFormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsAvailableViewComponent);
        component = fixture.componentInstance;
        const productsAvailableFormControl: FormArray = new FormArray([]);
        component.productsAvailableFormControl = productsAvailableFormControl;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
