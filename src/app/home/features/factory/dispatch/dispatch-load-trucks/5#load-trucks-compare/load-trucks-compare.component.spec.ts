import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTrucksCompareComponent } from './load-trucks-compare.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoadTrucksCompareComponent', () => {
    let component: LoadTrucksCompareComponent;
    let fixture: ComponentFixture<LoadTrucksCompareComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [LoadTrucksCompareComponent]
        }).compileComponents();
    }));

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(LoadTrucksCompareComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
