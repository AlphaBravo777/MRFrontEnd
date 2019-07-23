import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOrderMainViewComponent } from './insert-order-main-view.component';
import { TopMenuViewComponent } from './1#top-menu-view/top-menu-view.component';
import { RouteViewComponent } from './2#route-view/route-view.component';
import { AccountViewComponent } from './3#account-view/account-view.component';
import { InsertProductViewComponent } from './4#products-view/insert-products-view/insert-product-view.component';
import { ProductsAvailableViewComponent } from './4#products-view/products-available-view/products-available-view.component';

describe('InsertOrderMainViewComponent', () => {
    let component: InsertOrderMainViewComponent;
    let fixture: ComponentFixture<InsertOrderMainViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InsertOrderMainViewComponent,
                TopMenuViewComponent,
                RouteViewComponent,
                AccountViewComponent,
                InsertProductViewComponent,
                ProductsAvailableViewComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InsertOrderMainViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
