import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTrucksView1Component } from './load-trucks-view1.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoadTrucksView1Component', () => {
    let component: LoadTrucksView1Component;
    let fixture: ComponentFixture<LoadTrucksView1Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [LoadTrucksView1Component]
        }).compileComponents();
    }));

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(LoadTrucksView1Component);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
