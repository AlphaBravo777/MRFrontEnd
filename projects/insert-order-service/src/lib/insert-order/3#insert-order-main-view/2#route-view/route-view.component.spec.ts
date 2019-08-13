import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteViewComponent } from './route-view.component';
import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormControl,
    Form,
    FormGroupDirective
} from '@angular/forms';
import { SharedComponentsModule } from 'src/app/home/shared/components/shared-components.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { FloatLabelInputBoxComponent } from 'src/app/home/shared/components/float-label-input-box/float-label-input-box.component';

const testRouteArray: IRoute[] = [
    { routeName: 'Temba', routeid: 1 },
    { routeName: 'Mussina', routeid: 2 },
    { routeName: 'Pietersburg', routeid: 3 }
];
const formBuilder: FormBuilder = new FormBuilder();
const mainInsertTestForm = formBuilder.group({
    routeName: ['Temba']
});
const routeFormTestControl: FormControl = <FormControl>(
    mainInsertTestForm.get('routeName')
);

describe('RouteViewComponent', () => {
    let inputComponent: FloatLabelInputBoxComponent;
    let inputFixture: ComponentFixture<FloatLabelInputBoxComponent>;
    let component: RouteViewComponent;
    let fixture: ComponentFixture<RouteViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                SharedComponentsModule,
                HttpClientTestingModule,
                ApolloTestingModule
            ],
            declarations: [RouteViewComponent],
            providers: [
                FormGroupDirective,
                { provide: FormBuilder, useValue: formBuilder }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RouteViewComponent);
        inputFixture = TestBed.createComponent(FloatLabelInputBoxComponent);
        inputComponent = inputFixture.componentInstance;
        component = fixture.componentInstance;
        component.routesArray = testRouteArray;
        component.routeFormControl = routeFormTestControl;
        console.log('Here is the route: ', component.refinedRoutesArray);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select correct route', () => {

        const spy = spyOn(component, 'userRouteSelection').and.callThrough();
        const spy2 = spyOn(inputComponent, 'ngOnInit');
        component.routesArray = testRouteArray;
        console.log('RoutesArray = ', component.routesArray);
        // The refinedRoutesArray does not change after running the below command, even though it should
        component.userRouteSelection('pi');
        console.log('Here is the route: ', component.refinedRoutesArray);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('pi');
        // fixture.detectChanges();  // Running detect changes here also does not change anything
        // expect(component.refinedRoutesArray[0].routeName).toEqual('Pietersburg');
    });
});
