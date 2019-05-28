import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTrucksView2Component } from './load-trucks-view2.component';
import { LoadTrucksCompareComponent } from '../5#load-trucks-compare/load-trucks-compare.component';
import { LoadTrucksLoadingComponent } from '../6#load-trucks-loading/load-trucks-loading.component';
import { LoadWidgetComponent } from '../7#load-widget/load-widget.component';

describe('LoadTrucksView2Component', () => {
    let component: LoadTrucksView2Component;
    let fixture: ComponentFixture<LoadTrucksView2Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoadTrucksView2Component,
                LoadTrucksCompareComponent,
                LoadTrucksLoadingComponent,
                LoadWidgetComponent
            ]
        }).compileComponents();
    }));

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(LoadTrucksView2Component);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
