import { NgModule } from '@angular/core';
import { CustomMaterialModule } from 'src/app/home/shared/dropdown-table/custom-material.module';
import { StockTakeServiceRoutingComponent, StockTakeServiceRoutingModule } from './stock-take-service-routing.module';


@NgModule({
    declarations: [ 
        StockTakeServiceRoutingComponent
    ],
    imports: [

        StockTakeServiceRoutingModule,
        CustomMaterialModule
    ],
    exports: []
})
export class StockTakeServiceModule { }
