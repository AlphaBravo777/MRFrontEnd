import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoadTrucksDataComponent } from './load-trucks-data.component';
import { LoadTrucksView1Component } from '../3#load-trucks-view1/load-trucks-view1.component';
import { LoadTrucksView2Component } from '../4#load-trucks-view2/load-trucks-view2.component';
import { BoxShadowContainerComponent } from 'src/app/home/shared/dropdown-table/box-shadow-container/box-shadow-container.component';
import { LoadTrucksCompareComponent } from '../5#load-trucks-compare/load-trucks-compare.component';
import { LoadTrucksLoadingComponent } from '../6#load-trucks-loading/load-trucks-loading.component';
import { LoadWidgetComponent } from '../7#load-widget/load-widget.component';
import { Apollo } from 'apollo-angular-boost';

describe('LoadTrucksDataComponent', () => {
    let component: LoadTrucksDataComponent;
    let fixture: ComponentFixture<LoadTrucksDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [
                LoadTrucksDataComponent,
                LoadTrucksView1Component,
                LoadTrucksView2Component,
                BoxShadowContainerComponent,
                LoadTrucksCompareComponent,
                LoadTrucksLoadingComponent,
                LoadWidgetComponent
            ],
            providers: [Apollo]
        }).compileComponents();
    }));

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(LoadTrucksDataComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
