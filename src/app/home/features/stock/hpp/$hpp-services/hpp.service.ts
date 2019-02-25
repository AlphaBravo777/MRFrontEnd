import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HppApiService } from './hpp-api.service';
import { delay, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HppService {

    constructor(private hppApiService: HppApiService) {}

    getPnpProducts(): Observable<any> {
        return this.hppApiService.getPnpProducts().pipe(
            take(1),
            delay(500)
        );
    }

    getPostHppStock(): Observable<any> {
        return this.hppApiService.getPostHppStock().pipe(
            take(1),
            delay(500)
        );
    }

    getPreHppStock(): Observable<any> {
        return this.hppApiService.getPreHppStock().pipe(
            take(1),
            delay(500)
        );
    }

    getLeakersStock(): Observable<any> {
        return this.hppApiService.getHppLeakers().pipe(
            take(1),
            delay(500)
        );
    }
}
