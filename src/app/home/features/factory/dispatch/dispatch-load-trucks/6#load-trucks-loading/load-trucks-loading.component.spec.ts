import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTrucksLoadingComponent } from './load-trucks-loading.component';
import { LoadWidgetComponent } from '../7#load-widget/load-widget.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoadTrucksLoadingComponent', () => {
    let component: LoadTrucksLoadingComponent;
    let fixture: ComponentFixture<LoadTrucksLoadingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [LoadTrucksLoadingComponent, LoadWidgetComponent]
        }).compileComponents();
    }));

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(LoadTrucksLoadingComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
