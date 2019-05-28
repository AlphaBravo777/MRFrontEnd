import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryEntryComponent } from './factory-entry.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FactoryEntryComponent', () => {
    let component: FactoryEntryComponent;
    let fixture: ComponentFixture<FactoryEntryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [FactoryEntryComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FactoryEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
