import { Injectable } from '@angular/core';
import { IItemBasic } from './interfaces/item';
import { ProductGraphqlApiService } from './product-graphql-api.service';
import { Observable } from 'rxjs';
import { IMeasuringUnit, IPackaging, IItemVendor, IDepartment } from './interfaces/auxiliary';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private productGraphqlApiService: ProductGraphqlApiService) { }

    getAllItemsBasicInfo(): Observable<IItemBasic[]> {
        return this.productGraphqlApiService.getAllItemsBasicInfo();
    }

    getMeasuringUnits(): Observable<IMeasuringUnit[]> {
        return this.productGraphqlApiService.getMeasuringUnits();
    }

    getPackaging(): Observable<IPackaging[]> {
        return this.productGraphqlApiService.getPackaging();
    }

    getItemVendors(): Observable<IItemVendor[]> {
        return this.productGraphqlApiService.getVendors();
    }

    getAllGroupings(): Observable<IDepartment[]> {
        return this.productGraphqlApiService.getAllGroupingCatagories();
    }

}
