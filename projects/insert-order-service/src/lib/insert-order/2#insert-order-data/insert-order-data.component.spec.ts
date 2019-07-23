import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOrderDataComponent } from './insert-order-data.component';
import { InsertOrderMainViewComponent } from '../3#insert-order-main-view/insert-order-main-view.component';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { TopMenuViewComponent } from '../3#insert-order-main-view/1#top-menu-view/top-menu-view.component';
import { RouteViewComponent } from '../3#insert-order-main-view/2#route-view/route-view.component';
import { AccountViewComponent } from '../3#insert-order-main-view/3#account-view/account-view.component';
import { InsertProductViewComponent } from '../3#insert-order-main-view/4#products-view/insert-products-view/insert-product-view.component';
import { ProductsAvailableViewComponent
    } from '../3#insert-order-main-view/4#products-view/products-available-view/products-available-view.component';

describe('InsertOrderDataComponent', () => {
    let component: InsertOrderDataComponent;
    let fixture: ComponentFixture<InsertOrderDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InsertOrderDataComponent,
                InsertOrderMainViewComponent,
                TopMenuViewComponent,
                RouteViewComponent,
                AccountViewComponent,
                InsertProductViewComponent,
                ProductsAvailableViewComponent
            ],
            imports: [CustomMaterialModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InsertOrderDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
