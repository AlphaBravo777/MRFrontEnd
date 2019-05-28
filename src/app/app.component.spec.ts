import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgHttpLoaderComponent, SkCubeGridComponent,
    SkChasingDotsComponent, SkDoubleBounceComponent,
    SkRotatingPlaneComponent, SkSpinnerPulseComponent,
    SkThreeBounceComponent, SkWanderingCubesComponent, SkWaveComponent } from 'ng-http-loader';
import { AlertComponent } from './home/core/alerts/alert.component';
import { AlertService } from './home/core/alerts/alert.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [
            AppComponent,
            HomeComponent,
            NgHttpLoaderComponent,
            AlertComponent,
            SkCubeGridComponent, SkChasingDotsComponent, SkDoubleBounceComponent, SkRotatingPlaneComponent,
            SkSpinnerPulseComponent, SkThreeBounceComponent, SkWanderingCubesComponent, SkWaveComponent
        ],
        providers: [AlertService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
