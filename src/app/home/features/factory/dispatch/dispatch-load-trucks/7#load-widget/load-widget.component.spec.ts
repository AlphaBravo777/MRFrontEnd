import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadWidgetComponent } from './load-widget.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoadWidgetComponent', () => {
    let component: LoadWidgetComponent;
    let fixture: ComponentFixture<LoadWidgetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [LoadWidgetComponent]
        }).compileComponents();
    }));

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(LoadWidgetComponent);
    //     component = fixture.componentInstance;
    //     fixture.detectChanges();
    // });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
