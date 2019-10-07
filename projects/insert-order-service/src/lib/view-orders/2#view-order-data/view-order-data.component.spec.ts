import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderDataComponent } from './view-order-data.component';
import { ViewOrderMainViewComponent } from '../3#view-order-main-view/view-order-main-view.component';
import { BoxShadowContainerComponent } from 'src/app/home/shared/dropdown-table/box-shadow-container/box-shadow-container.component';
import { MinimalisticButtonComponent } from 'src/app/home/shared/components/minimalistic-button/minimalistic-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ViewOrderDataComponent', () => {
    let component: ViewOrderDataComponent;
    let fixture: ComponentFixture<ViewOrderDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ViewOrderDataComponent,
                ViewOrderMainViewComponent,
                BoxShadowContainerComponent,
                MinimalisticButtonComponent
            ],
            imports: [ HttpClientTestingModule, ApolloTestingModule ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewOrderDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
