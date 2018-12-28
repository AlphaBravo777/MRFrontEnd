import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HppStockTakeApiService } from './hpp-stock-take-api.service';

@Injectable({
    providedIn: 'root'
})
export class HppStockTakeService {

    private hppStock = new BehaviorSubject<any[]>([]);
    currentHppStock$ = this.hppStock.asObservable();

    constructor(private hppStockTakeApi: HppStockTakeApiService) {
        this.getHppStock();
    }

    getHppStock() {
        this.hppStockTakeApi.getHppStockAvailable().subscribe(data => {
            this.hppStock.next(data);
        });
    }
}
