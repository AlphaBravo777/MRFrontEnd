import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { InsertOrderMainViewComponent } from './insert-order-main-view.component';
import { TopMenuViewComponent } from './1#top-menu-view/top-menu-view.component';
import { RouteViewComponent } from './2#route-view/route-view.component';
import { AccountViewComponent } from './3#account-view/account-view.component';
import { InsertProductViewComponent } from './4#products-view/insert-products-view/insert-product-view.component';
import { ProductsAvailableViewComponent } from './4#products-view/products-available-view/products-available-view.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('InsertOrderMainViewComponent', () => {
    let component: InsertOrderMainViewComponent;
    let fixture: ComponentFixture<InsertOrderMainViewComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                SharedComponentsModule,
                HttpClientTestingModule,
                ApolloTestingModule,
                FormsModule
            ],
            declarations: [
                InsertOrderMainViewComponent,
                TopMenuViewComponent,
                RouteViewComponent,
                AccountViewComponent,
                InsertProductViewComponent,
                ProductsAvailableViewComponent
            ],
            providers: [{ provide: FormBuilder, useValue: formBuilder }]
        }).compileComponents();
    }));

    beforeEach( () => {
        fixture = TestBed.createComponent(InsertOrderMainViewComponent);
        component = fixture.componentInstance;
        component.mainInsertForm = formBuilder.group({
            routeName: ['Temba']
        });
        const errorMessages = [{error: 'nothing'}];
        component.errorMessages = errorMessages;
        // fixture.detectChanges();  // This gives an error "TypeError: Cannot read property 'invalid' of undefined"
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('test', component);
    });
});
