import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { TestFormComponent } from './4#controls-form/test-form/test-form.component';
import { NgStackFormsModule } from '@ng-stack/forms';
import { MainTestComponent } from './4#controls-form/main-test/main-test.component';
import { Testleg1Component } from './4#controls-form/testleg1/testleg1.component';
import { Testleg2Component } from './4#controls-form/testleg2/testleg2.component';
import { InsertProductRoutingModule } from './insert-product-routing.module';
import { MaterialConfigModule } from 'src/app/material-config/material-config.module';
import { InsertProductFormComponent } from './4#controls-form/insert-product-form/insert-product-form.component';
import { InsertProductDataComponent } from './2#insert-product-data/insert-product-data.component';
import { InsertProductViewComponent } from './3#insert-product-view/insert-product-view.component';
import { ProductFormNameComponent } from './4#controls-form/product-form-name/product-form-name.component';
import { ProductFormPriceComponent } from './4#controls-form/product-form-price/product-form-price.component';
import { ProductFormBuildingBlocksComponent } from './4#controls-form/product-form-building-blocks/product-form-building-blocks.component';
import { ProductFormGroupsComponent } from './4#controls-form/product-form-name/product-form-groups/product-form-groups.component';
import { ProductFormSinglesComponent } from './4#controls-form/product-form-singles/product-form-singles.component';
import { ProductFormSizeComponent } from './4#controls-form/product-form-size/product-form-size.component';
import { ProductFormVendorComponent } from './4#controls-form/product-form-vendor/product-form-vendor.component';
import { ProductFormPackagingComponent } from './4#controls-form/product-form-packaging/product-form-packaging.component';


@NgModule({
    declarations: [
        TestFormComponent,
        MainTestComponent,
        Testleg1Component,
        Testleg2Component,
        ProductFormGroupsComponent,
        InsertProductFormComponent,
        InsertProductDataComponent,
        InsertProductViewComponent,
        ProductFormNameComponent,
        ProductFormPriceComponent,
        ProductFormBuildingBlocksComponent,
        ProductFormSinglesComponent,
        ProductFormSizeComponent,
        ProductFormVendorComponent,
        ProductFormPackagingComponent],
    imports: [
        CommonModule,
        CustomMaterialModule,
        MaterialConfigModule,
        SharedComponentsModule,
        InsertProductRoutingModule,
        NgStackFormsModule,
    ]
})
export class InsertProductModule { }
