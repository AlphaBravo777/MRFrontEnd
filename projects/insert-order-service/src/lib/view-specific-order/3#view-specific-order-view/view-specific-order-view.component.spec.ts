import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificOrderViewComponent } from './view-specific-order-view.component';
import { ExpandableDivComponent } from 'src/app/home/shared/components/expandable-div/expandable-div.component';
import { HeadingDropdownViewComponent } from './heading-dropdown-view/heading-dropdown-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FloatLabelInputBoxComponent } from 'src/app/home/shared/components/float-label-input-box/float-label-input-box.component';
import { MinimalisticButtonComponent } from 'src/app/home/shared/components/minimalistic-button/minimalistic-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { IOrderDetails } from '../../#sharedServices/interfaces/order-service-Interfaces';
import { IUniqueProductTotals } from 'projects/product-service/src/lib/#shared-services/interfaces/products-interface';
import { IViewRoutesData } from '../../view-orders/1#view-order-services/view-order-interface';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewSpecificOrderViewComponent', () => {
    let component: ViewSpecificOrderViewComponent;
    let fixture: ComponentFixture<ViewSpecificOrderViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ViewSpecificOrderViewComponent,
                ExpandableDivComponent,
                HeadingDropdownViewComponent,
                FloatLabelInputBoxComponent,
                MinimalisticButtonComponent
            ],
            imports: [ReactiveFormsModule, MatDatepickerModule, HttpClientTestingModule, ApolloTestingModule, MatNativeDateModule, RouterTestingModule ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewSpecificOrderViewComponent);
        component = fixture.componentInstance;
        const orders: IOrderDetails[] = [];
        component.orders = orders;
        const uniqueProductsDetails: Set<IUniqueProductTotals> = new Set();
        component.uniqueProductsDetails = uniqueProductsDetails;
        const currentRoute: IViewRoutesData = {routeAmountPercentage: null, routeAmountTotal: null, routeName: null, routeid: null};
        component.currentRoute = currentRoute;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
